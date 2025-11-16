import pool from "../db/db.js";

/**
 * CREAR TURNO
 */
export const createTurn = async (req, res) => {
  try {
    const { idpaciente, idarea, priorizacion } = req.body;

    // Obtener siguiente número de turno
    const last = await pool.query(
      "SELECT COALESCE(MAX(numeroturno), 0) AS maxnum FROM turnos"
    );

    const nextNum = last.rows[0].maxnum + 1;

    const sql = `
      INSERT INTO turnos (numeroturno, idpaciente, idarea, priorizacion)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const { rows } = await pool.query(sql, [
      nextNum,
      idpaciente,
      idarea,
      priorizacion || "Normal",
    ]);

    res.status(201).json(rows[0]);

  } catch (err) {
    console.error("createTurn error:", err);
    res.status(500).json({ error: "Error creando turno" });
  }
};


/**
 * SIGUIENTE TURNO EN ESPERA POR ÁREA
 */
export const getNextTurn = async (req, res) => {
  try {
    const { areaid } = req.params;

    const sql = `
      SELECT t.*
      FROM turnos t
      JOIN estadoturno e ON e.idestado = t.idestado
      WHERE t.idarea = $1 AND e.estado = 'Espera'
      ORDER BY t.fechacreacion ASC
      LIMIT 1
    `;

    const { rows } = await pool.query(sql, [areaid]);

    res.json(rows[0] || null);

  } catch (err) {
    console.error("getNextTurn error:", err);
    res.status(500).json({ error: "Error obteniendo siguiente turno" });
  }
};


/**
 * LLAMAR TURNO
 */
export const callTurn = async (req, res) => {
  try {
    const { idturno } = req.params;

    const estado = await pool.query(
      "SELECT idestado FROM estadoturno WHERE estado='Llamando' LIMIT 1"
    );

    const idEstado = estado.rows[0].idestado;

    const { rows } = await pool.query(
      `UPDATE turnos 
       SET idestado=$1, llamadoen=NOW() 
       WHERE idturno=$2 
       RETURNING *`,
      [idEstado, idturno]
    );

    res.json(rows[0]);

  } catch (err) {
    console.error("callTurn error:", err);
    res.status(500).json({ error: "Error llamando turno" });
  }
};


/**
 * INICIAR ATENCIÓN
 */
export const startTurn = async (req, res) => {
  try {
    const { idturno } = req.params;

    const estado = await pool.query(
      "SELECT idestado FROM estadoturno WHERE estado='Atendiendo' LIMIT 1"
    );

    const idEstado = estado.rows[0].idestado;

    const { rows } = await pool.query(
      `UPDATE turnos 
       SET idestado=$1, atendidoen=NOW() 
       WHERE idturno=$2 
       RETURNING *`,
      [idEstado, idturno]
    );

    res.json(rows[0]);

  } catch (err) {
    console.error("startTurn error:", err);
    res.status(500).json({ error: "Error iniciando atención" });
  }
};


/**
 * FINALIZAR
 */
export const finishTurn = async (req, res) => {
  try {
    const { idturno } = req.params;

    const estado = await pool.query(
      "SELECT idestado FROM estadoturno WHERE estado='Finalizado' LIMIT 1"
    );

    const idEstado = estado.rows[0].idestado;

    const { rows } = await pool.query(
      `UPDATE turnos 
       SET idestado=$1, finalizadoen=NOW()
       WHERE idturno=$2 
       RETURNING *`,
      [idEstado, idturno]
    );

    res.json(rows[0]);

  } catch (err) {
    console.error("finishTurn error:", err);
    res.status(500).json({ error: "Error finalizando turno" });
  }
};


/**
 * LISTAR TURNOS
 */
export const listTurns = async (req, res) => {
  try {
    const { areaid } = req.query;

    let sql = `
      SELECT 
        t.*, 
        p.nombrecompleto AS paciente_nombre, 
        a.nombrearea AS area_nombre, 
        e.estado AS estado_nombre
      FROM turnos t
      JOIN pacientes p ON p.idpaciente = t.idpaciente
      JOIN areashospital a ON a.idarea = t.idarea
      JOIN estadoturno e ON e.idestado = t.idestado
    `;

    const params = [];

    if (areaid) {
      sql += " WHERE t.idarea=$1";
      params.push(areaid);
    }

    sql += " ORDER BY t.fechacreacion DESC LIMIT 200";

    const { rows } = await pool.query(sql, params);

    res.json(rows);

  } catch (err) {
    console.error("listTurns error:", err);
    res.status(500).json({ error: "Error listando turnos" });
  }
};
