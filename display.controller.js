import pool from "./db.js";

export const getDisplayByArea = async (req, res) => {
  try {
    const { areaId } = req.params;

    const { rows } = await pool.query(
      `SELECT d.iddisplay, d.nombredisplay, d.descripcion, d.activo,
              a.idarea, a.nombrearea
       FROM displays d
       INNER JOIN areashospital a ON d.idarea = a.idarea
       WHERE d.idarea = $1
       ORDER BY d.iddisplay`,
      [areaId]
    );

    res.json(rows);
  } catch (err) {
    console.error("getDisplayByArea error:", err);
    res.status(500).json({ error: "Error obteniendo displays por área" });
  }
};
