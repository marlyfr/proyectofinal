🏥 Sistema de Gestión de Turnos – Proyecto Final

Sistema completo para gestionar áreas, pacientes y turnos, con dashboard en tiempo real, pantalla pública (display) y autenticación.
Este proyecto se despliega en Render (Backend) y funciona con un Frontend estático directamente cargado en GitHub.

🚀 Tecnologías
Backend (Render)
Node.js + Express
PostgreSQL (Render PostgreSQL)
JWT
Bcrypt
Dotenv
Socket.IO (Render soporta websockets)
CORS
Frontend
HTML5 + CSS3
JavaScript
Bootstrap 5
Fetch API
Socket.IO Client

🌐 Deploy en Render

El backend está desplegado en:
https://proyectofinal-1-81b6.onrender.com

Tu frontend se comunica con Render usando:
const API_BASE = "https://proyectofinal-1-81b6.onrender.com";

Todo el proyecto funciona únicamente consumiendo esa API.

📂 Estructura (sin carpetas — EXACTA como tu repositorio)
/ (root del repo)
│── index.html
│── dashboard.html
│── patients.html
│── areas.html
│── turns.html
│── display.html
│── style.css
│── dashboard.css
│── tables.css
│── api.js
│── auth.js
│── dashboard.js
│── patients.js
│── areas.js
│── turns.js
│── favicon.ico
│── logo.png
│── package.json
│── server.js
│── db.js
│── auth.routes.js
│── areas.routes.js
│── patients.routes.js
│── turns.routes.js
│── display.routes.js
│── .env (local — NO se sube)

⚙️ Instalación Local
1️⃣ Instalar dependencias
npm install

2️⃣ Crear .env

(Recuerda que Render usa sus propias variables)

PORT=10000
DATABASE_URL=postgres://user:pass@host:5432/dbname
JWT_SECRET=miclaveultrasecreta

3️⃣ Ejecutar localmente
npm start

🚀 Configuración de Render
▶️ 1. Crear servicio Web Service

Runtime: Node

Start Command:

node server.js

▶️ 2. Agregar Variables de Entorno

JWT_SECRET

DATABASE_URL

PORT = 10000 (Render usa este puerto)

▶️ 3. Activar WebSockets

Render lo habilita automáticamente si usas Socket.IO.

🔐 Autenticación

Frontend usa:

auth.js → login, logout y protección de páginas

Token almacenado en localStorage

Todas las peticiones usan Bearer Token:

headers: {
  "Authorization": "Bearer " + token
}

📊 Dashboard en Tiempo Real

El archivo:
dashboard.js

Consulta:
/api/areas
/api/patients
/api/turns
Y escucha eventos usando Socket.IO:
socket.on("turno:update", () => {
  Dashboard.init();
});

Cada vez que un turno es:
creado
actualizado
llamado
finalizado
el dashboard se refresca.

🖥️ Display Público
display.html consume:

GET /api/display

Y se actualiza con:
turno:update

Es compatible 100% con Render.

📡 Endpoints Principales
Método	Ruta	Descripción
POST	/api/auth/login	Iniciar sesión
GET	/api/areas	Obtener áreas
POST	/api/areas	Crear área
GET	/api/patients	Obtener pacientes
POST	/api/patients	Crear paciente
GET	/api/turns	Obtener turnos
POST	/api/turns	Crear turno
PUT	/api/turns/:id/estado	Cambiar estado
GET	/api/display	Datos para pantalla pública


📄 Licencia

MIT — libre para uso académico y profesional.
