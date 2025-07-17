// Esperamos a que todo el DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {

  // Obtenemos los elementos del DOM que vamos a usar
  const formulario = document.getElementById("formulario");          // Formulario donde el usuario escribe
  const input = document.getElementById("pregunta");                 // Campo de texto del usuario
  const chat = document.getElementById("chatBox");                   // Caja donde se muestran los mensajes
  const toggleBtn = document.getElementById("modoToggle");           // Botón para cambiar modo claro/oscuro
  const idiomaSelect = document.getElementById("idiomaSelect");      // Selector de idioma

  // Evento al enviar el formulario (cuando el usuario presiona Enter o Enviar)
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    const mensaje = input.value.trim(); // Obtenemos el mensaje y quitamos espacios extra

    if (!mensaje) return; // Si está vacío, no hacemos nada

    // Mostramos el mensaje del usuario en el chat
    chat.innerHTML += `<div class="mensaje usuario">Usuario: ${mensaje}</div>`;

    // Mostramos un mensaje temporal indicando que el bot está "escribiendo"
    chat.innerHTML += `<div class="mensaje bot" id="typing">Chatbot está escribiendo...</div>`;

    // Hacemos scroll hacia el final para que se vea el mensaje nuevo
    chat.scrollTop = chat.scrollHeight;

    try {
      // Enviamos el mensaje al backend mediante una petición POST
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje,
          idioma: idiomaSelect.value // Enviamos también el idioma seleccionado
        })
      });

      const data = await res.json(); // Esperamos la respuesta del backend

      // Eliminamos el mensaje de "escribiendo..."
      document.getElementById("typing").remove();

      // Mostramos la respuesta del chatbot
      chat.innerHTML += `<div class="mensaje bot">Chatbot: ${data.respuesta}</div>`;

    } catch (err) {
      // En caso de error en la conexión
      document.getElementById("typing").remove();
      chat.innerHTML += `<div class="mensaje bot">Chatbot: Error al conectar con el servidor.</div>`;
    }

    // Hacemos scroll hacia abajo y limpiamos el input
    chat.scrollTop = chat.scrollHeight;
    input.value = "";
  });

  // Evento para cambiar el modo claro/oscuro
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark"); // Alterna la clase 'dark' en el body

    // Cambia el icono del botón dependiendo del modo
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
});
