import pool from "./db.js";

export const createArea = async (req, res) => {
  try {
    const { nombrearea, descripcion } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO areashospital (nombrearea, descripcion)
       VALUES ($1, $2)
       RETURNING *`,
      [nombrearea, descripcion]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("createArea error:", err);
    res.status(500).json({ error: "Error creando área" });
  }
};

export const listAreas = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM areashospital ORDER BY idarea`);
    res.json(rows);
  } catch (err) {
    console.error("listAreas error:", err);
    res.status(500).json({ error: "Error listando áreas" });
  }
};

export const getArea = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM areashospital WHERE idarea = $1`,
      [req.params.id]
    );

    if (!rows[0]) return res.status(404).json({ error: "Área no encontrada" });

    res.json(rows[0]);
  } catch (err) {
    console.error("getArea error:", err);
    res.status(500).json({ error: "Error obteniendo área" });
  }
};

export const updateArea = async (req, res) => {
  try {
    const { nombrearea, descripcion, activo } = req.body;

    const { rows } = await pool.query(
      `UPDATE areashospital
       SET nombrearea = COALESCE($1, nombrearea),
           descripcion = COALESCE($2, descripcion),
           activo = COALESCE($3, activo)
       WHERE idarea = $4
       RETURNING *`,
      [nombrearea, descripcion, activo, req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("updateArea error:", err);
    res.status(500).json({ error: "Error actualizando área" });
  }
};

export const deleteArea = async (req, res) => {
  try {
    await pool.query(`DELETE FROM areashospital WHERE idarea = $1`, [
      req.params.id
    ]);

    res.json({ message: "Área eliminada" });
  } catch (err) {
    console.error("deleteArea error:", err);
    res.status(500).json({ error: "Error eliminando área" });
  }
};

