// =======================
// Importación de librerías
// =======================

// Express: framework para crear el servidor web
const express = require("express");

// CORS: permite que el frontend (desde otro origen) pueda hacer peticiones al backend
const cors = require("cors");

// Path: módulo nativo para manejar rutas del sistema de archivos de forma segura
const path = require("path");

// FS: módulo para leer archivos del sistema (aquí lo usamos para leer los archivos .json de respuestas)
const fs = require("fs");

// =======================
// Configuración inicial del servidor
// =======================

const app = express();

// Permite solicitudes de cualquier origen (útil para desarrollo local con frontend separado)
app.use(cors());

// Habilita el soporte para leer JSON en los requests (por ejemplo en POST)
app.use(express.json());

// Sirve los archivos estáticos del frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../frontend")));

// =======================
// Función para limpiar el texto del usuario
// =======================

// Esta función estandariza las preguntas del usuario quitando tildes, signos y espacios innecesarios
function limpiarTexto(texto) {
  return texto
    .toLowerCase() // convierte todo a minúsculas
    .normalize("NFD") // separa letras con tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos/tildes
    .replace(/[¿?¡!.,;:]/g, "") // remueve signos de puntuación
    .replace(/\s+/g, " ") // unifica espacios múltiples en uno solo
    .trim(); // elimina espacios al principio y final
}

// =======================
// Ruta principal del chatbot
// =======================

app.post("/api/chat", (req, res) => {
  // Extraemos el mensaje del usuario y el idioma seleccionado (por defecto "es")
  const mensajeUsuario = limpiarTexto(req.body.mensaje || "");
  const idioma = req.body.idioma === "en" ? "en" : "es";

  // Carga el archivo correspondiente según el idioma
  const archivo = path.join(__dirname, `respuestas_${idioma}.json`);

  // Leemos el archivo JSON que contiene las respuestas
  fs.readFile(archivo, "utf8", (err, data) => {
    if (err) {
      // Si hubo un error (por ejemplo, el archivo no existe), mostramos mensaje genérico
      console.error(" Error al leer el archivo:", err.message);
      return res.json({
        respuesta: "Lo siento, hubo un error cargando las respuestas.",
      });
    }

    let respuestas;
    try {
      // Parseamos el archivo para convertirlo de texto a objeto JavaScript
      respuestas = JSON.parse(data);
    } catch (e) {
      // Si el archivo no tiene formato JSON válido, devolvemos error
      console.error(" Error al parsear JSON:", e.message);
      return res.json({
        respuesta: "Error interno en el formato de respuestas.",
      });
    }

    // Buscamos la respuesta en el archivo usando la clave normalizada
    let respuesta = respuestas[mensajeUsuario] || "Lo siento, no entiendo la pregunta.";

    // Devolvemos la respuesta al frontend en formato JSON
    res.json({ respuesta });
  });
});

// =======================
// Inicio del servidor
// =======================

// Puerto del servidor (usa 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Inicia el servidor y muestra mensaje en consola
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
