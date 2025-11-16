import pool from "../db/db.js";

// ============================
// CREAR PACIENTE
// ============================
export const createPatient = async (req, res) => {
  try {
    const { nombrecompleto, dpi, fechanacimiento, telefono, direccion, correo } = req.body;

    const sql = `
      INSERT INTO pacientes (nombrecompleto, dpi, fechanacimiento, telefono, direccion, correo)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const { rows } = await pool.query(sql, [
      nombrecompleto,
      dpi,
      fechanacimiento,
      telefono,
      direccion,
      correo,
    ]);

    res.status(201).json(rows[0]);

  } catch (err) {
    console.error("createPatient error:", err);
    res.status(500).json({ error: "Error creando paciente" });
  }
};

// ============================
// OBTENER UN PACIENTE
// ============================
export const getPatient = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM pacientes WHERE idpaciente = $1`,
      [req.params.id]
    );

    if (!rows[0])
      return res.status(404).json({ error: "Paciente no encontrado" });

    res.json(rows[0]);

  } catch (err) {
    console.error("getPatient error:", err);
    res.status(500).json({ error: "Error obteniendo paciente" });
  }
};

// ============================
// LISTAR PACIENTES
// ============================
export const listPatients = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM pacientes ORDER BY idpaciente DESC LIMIT 200`
    );

    res.json(rows);

  } catch (err) {
    console.error("listPatients error:", err);
    res.status(500).json({ error: "Error listando pacientes" });
  }
};

// ============================
// ACTUALIZAR PACIENTE
// ============================
export const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombrecompleto, dpi, fechanacimiento, telefono, direccion, correo } =
      req.body;

    const sql = `
      UPDATE pacientes
      SET 
        nombrecompleto = COALESCE($1, nombrecompleto),
        dpi = COALESCE($2, dpi),
        fechanacimiento = COALESCE($3, fechanacimiento),
        telefono = COALESCE($4, telefono),
        direccion = COALESCE($5, direccion),
        correo = COALESCE($6, correo)
      WHERE idpaciente = $7
      RETURNING *
    `;

    const { rows } = await pool.query(sql, [
      nombrecompleto,
      dpi,
      fechanacimiento,
      telefono,
      direccion,
      correo,
      id,
    ]);

    if (!rows[0])
      return res.status(404).json({ error: "Paciente no encontrado" });

    res.json(rows[0]);

  } catch (err) {
    console.error("updatePatient error:", err);
    res.status(500).json({ error: "Error actualizando paciente" });
  }
};

// ============================
// ELIMINAR PACIENTE
// ============================
export const deletePatient = async (req, res) => {
  try {
    await pool.query(`DELETE FROM pacientes WHERE idpaciente = $1`, [
      req.params.id,
    ]);

    res.json({ message: "Paciente eliminado" });

  } catch (err) {
    console.error("deletePatient error:", err);
    res.status(500).json({ error: "Error eliminando paciente" });
  }
};
