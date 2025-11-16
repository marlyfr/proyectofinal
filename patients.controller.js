import pool from "./db.js";

export const createPatient = async (req, res) => {
  try {
    const { nombre, dpi, telefono } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO pacientes (nombre, dpi, telefono)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, dpi, telefono]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("createPatient error:", err);
    res.status(500).json({ error: "Error creando paciente" });
  }
};

export const listPatients = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM pacientes ORDER BY idpaciente`
    );
    res.json(rows);
  } catch (err) {
    console.error("listPatients error:", err);
    res.status(500).json({ error: "Error listando pacientes" });
  }
};

export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `SELECT * FROM pacientes WHERE idpaciente=$1`,
      [id]
    );

    if (!rows[0]) return res.status(404).json({ error: "Paciente no encontrado" });

    res.json(rows[0]);
  } catch (err) {
    console.error("getPatient error:", err);
    res.status(500).json({ error: "Error obteniendo paciente" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, dpi, telefono } = req.body;

    const { rows } = await pool.query(
      `UPDATE pacientes SET
         nombre = COALESCE($1, nombre),
         dpi = COALESCE($2, dpi),
         telefono = COALESCE($3, telefono)
       WHERE idpaciente = $4
       RETURNING *`,
      [nombre, dpi, telefono, id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("updatePatient error:", err);
    res.status(500).json({ error: "Error actualizando paciente" });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(`DELETE FROM pacientes WHERE idpaciente=$1`, [id]);

    res.json({ message: "Paciente eliminado" });
  } catch (err) {
    console.error("deletePatient error:", err);
    res.status(500).json({ error: "Error eliminando paciente" });
  }
};

