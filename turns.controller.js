import pool from "./db.js";

export const createTurn = async (req, res) => {
  try {
    const { idpaciente, idarea } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO turnos (idpaciente, idarea, estado)
       VALUES ($1, $2, 'EN ESPERA')
       RETURNING *`,
      [idpaciente, idarea]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("createTurn error:", err);
    res.status(500).json({ error: "Error creando turno" });
  }
};

export const listTurns = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT t.*, p.nombre AS paciente, a.nombrearea AS area
       FROM turnos t
       LEFT JOIN pacientes p ON t.idpaciente = p.idpaciente
       LEFT JOIN areashospital a ON t.idarea = a.idarea
       ORDER BY t.idturno`
    );

    res.json(rows);
  } catch (err) {
    console.error("listTurns error:", err);
    res.status(500).json({ error: "Error listando turnos" });
  }
};

export const getTurn = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `SELECT * FROM turnos WHERE idturno=$1`,
      [id]
    );

    if (!rows[0]) return res.status(404).json({ error: "Turno no encontrado" });

    res.json(rows[0]);
  } catch (err) {
    console.error("getTurn error:", err);
    res.status(500).json({ error: "Error obteniendo turno" });
  }
};

export const updateTurn = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, idarea } = req.body;

    const { rows } = await pool.query(
      `UPDATE turnos SET
         estado = COALESCE($1, estado),
         idarea = COALESCE($2, idarea)
       WHERE idturno=$3
       RETURNING *`,
      [estado, idarea, id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("updateTurn error:", err);
    res.status(500).json({ error: "Error actualizando turno" });
  }
};

export const deleteTurn = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(`DELETE FROM turnos WHERE idturno=$1`, [id]);

    res.json({ message: "Turno eliminado" });
  } catch (err) {
    console.error("deleteTurn error:", err);
    res.status(500).json({ error: "Error eliminando turno" });
  }
};

// LLAMAR SIGUIENTE TURNO
export const callNextTurn = async (req, res) => {
  try {
    const { idarea } = req.body;

    const { rows } = await pool.query(
      `SELECT * FROM turnos
       WHERE idarea=$1 AND estado='EN ESPERA'
       ORDER BY idturno ASC
       LIMIT 1`,
      [idarea]
    );

    if (!rows[0])
      return res.status(404).json({ error: "No hay turnos en espera" });

    const turno = rows[0];

    await pool.query(
      `UPDATE turnos SET estado='ATENDIENDO' WHERE idturno=$1`,
      [turno.idturno]
    );

    res.json(turno);
  } catch (err) {
    console.error("callNextTurn error:", err);
    res.status(500).json({ error: "Error llamando próximo turno" });
  }
};

