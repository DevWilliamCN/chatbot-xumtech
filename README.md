# Proyecto Chatbot – XUMTECH

Este proyecto consiste en el desarrollo de un chatbot local, funcional y visualmente atractivo, diseñado como parte de una evaluación técnica para XUMTECH. El sistema responde preguntas frecuentes tanto en español como en inglés, incluye modo oscuro y soporte para múltiples idiomas.

## Autor
**William José Cubero Navarro**  
Ingeniero en Tecnologías de la Información  
Especializado en el desarrollo de software  
[LinkedIn](https://www.linkedin.com/in/william-cubero-navarro-75880727a/)

---

## Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Manejo de archivos**: `fs` para leer archivos `.json` con respuestas
- **Ejecución local** sin conexión a bases de datos externas

---

## Estructura del proyecto

```
Proyecto-chatbot-xumtech/
├── backend/
│   ├── index.js               // Servidor Express con lógica de respuesta
│   ├── respuestas_es.json     // Respuestas en español
│   ├── respuestas_en.json     // Respuestas en inglés
├── frontend/
│   ├── index.html             // Interfaz principal
│   ├── style.css              // Estilos con soporte dark mode
│   └── main.js                // Lógica del cliente: envío, respuesta, UI
```

---

## Funcionalidades

- Chat con respuestas automáticas en español e inglés
- Modo oscuro con botón toggle
- Selector de idioma flotante
- Indicador visual de "Chatbot está escribiendo..."
- Interfaz responsive, moderna y minimalista
- Footer y header fijos y estilizados

---

## Instrucciones para ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Asegúrate de tener Node.js instalado.
3. En la carpeta `backend/`, ejecuta:
   ```bash
   npm install
   node index.js
   ```
4. Abre `index.html` desde la carpeta `frontend/` en tu navegador o usa un servidor local.

---

## Observaciones

- Las respuestas se almacenan en archivos `.json` separados por idioma.
- Se incluye una función de limpieza de texto (`limpiarTexto()`) que normaliza las entradas del usuario para mejorar la coincidencia.
- Toda la lógica es local y no requiere servicios externos.

---

## Licencia

Este proyecto fue desarrollado con fines evaluativos y educativos.

