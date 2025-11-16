import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generateToken(user) {
  return jwt.sign(
    {
      idusuario: user.idusuario,  // PK
      usuario: user.usuario,      // username
      rol: user.idrol             // role ID
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "8h" }
  );
}
