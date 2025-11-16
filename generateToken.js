import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generateToken(user) {
  return jwt.sign(
    {
      idusuario: user.idusuario,   // PK
      usuario: user.usuario,       // nombre de usuario
      rol: user.idrol              // id del rol
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "8h" }
  );
}
