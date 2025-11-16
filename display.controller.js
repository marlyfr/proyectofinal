import pool from "./db.js";

export const getDisplayTurns = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
         t.idturno,
         t.estado,
         p.nombre AS paciente,
         a.nombrearea AS area
       FROM turnos t
       LEFT JOIN pacientes p ON p.idpaciente = t.idpaciente
       LEFT JOIN areashospital a ON a.idarea = t.idarea
       ORDER BY t.idturno DESC
       LIMIT 10`
    );

    res.json(rows);
  } catch (err) {
    console.error("getDisplayTurns error:", err);
    res.status(500).json({ error: "Error obteniendo datos del display" });
  }
};


