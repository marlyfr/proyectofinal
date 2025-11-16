import pool from "../db/db.js";

export const getDisplayByArea = async (req, res) => {
  try {
    const areaId = req.params.areaId;

    // Turno actual (llamando o atendiendo)
    const currentQ = `
      SELECT 
        t.idturno, 
        t.numeroturno, 
        e.estado AS estado,
        p.nombrecompleto AS paciente
      FROM turnos t
      JOIN estadoturno e ON e.idestado = t.idestado
      JOIN pacientes p ON p.idpaciente = t.idpaciente
      WHERE t.idarea = $1 
        AND e.estado IN ('Llamando', 'Atendiendo')
      ORDER BY t.fechacreacion DESC
      LIMIT 1
    `;

    // Siguiente turno en espera
    const nextQ = `
      SELECT 
        t.idturno, 
        t.numeroturno
      FROM turnos t
      JOIN estadoturno e ON e.idestado = t.idestado
      WHERE t.idarea = $1 
        AND e.estado = 'Espera'
      ORDER BY t.fechacreacion ASC
      LIMIT 1
    `;

    const { rows: currRows } = await pool.query(currentQ, [areaId]);
    const { rows: nextRows } = await pool.query(nextQ, [areaId]);

    res.json({
      current: currRows[0] || null,
      next: nextRows[0] || null,
      timestamp: new Date()
    });

  } catch (err) {
    console.error("display error:", err);
    res.status(500).json({ error: "Error obteniendo información del display" });
  }
};

