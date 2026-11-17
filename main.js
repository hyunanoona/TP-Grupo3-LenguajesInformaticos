

/* ---------- 1) Modo oscuro ---------- */
const botonModo = document.getElementById("btn-modo");

// Actualiza el texto del botón según el estado actual
const actualizarBoton = () => {
    const oscuro = document.body.classList.contains("oscuro");
    botonModo.textContent = oscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
    botonModo.setAttribute("aria-pressed", oscuro);
    // Activa también el modo oscuro nativo de Bootstrap (tablas, alerts, etc.)
    document.documentElement.setAttribute("data-bs-theme", oscuro ? "dark" : "light");
};

if (botonModo) {
    // Recuperar la preferencia guardada si el navegador lo permite
    try {
        if (localStorage.getItem("modo") === "oscuro") {
            document.body.classList.add("oscuro");
        }
    } catch (e) { /* sin almacenamiento: seguimos igual */ }
    actualizarBoton();

    botonModo.addEventListener("click", () => {
        document.body.classList.toggle("oscuro");
        try {
            localStorage.setItem(
                "modo",
                document.body.classList.contains("oscuro") ? "oscuro" : "claro"
            );
        } catch (e) { /* ignorar */ }
        actualizarBoton();
    });
}

/*  Validación del formulario de contacto  */
const formulario = document.getElementById("form-contacto");

if (formulario) {
    const aviso = document.getElementById("mensaje-form");

    const mostrarMensaje = (texto, tipo) => {
        aviso.textContent = texto;
        aviso.className = `alert alert-${tipo}`; // quita d-none y aplica el color
    };

    formulario.addEventListener("submit", (event) => {
        event.preventDefault(); // evita que la página se recargue

        const nombre = document.getElementById("nombre");
        const email = document.getElementById("email");
        const mensaje = document.getElementById("mensaje");

        const nombreOk = nombre.value.trim() !== "";
        const emailOk = email.value.includes("@") && email.value.trim().length > 3;
        const mensajeOk = mensaje.value.trim() !== "";

        // Marcar en rojo los campos con error
        nombre.classList.toggle("is-invalid", !nombreOk);
        email.classList.toggle("is-invalid", !emailOk);
        mensaje.classList.toggle("is-invalid", !mensajeOk);

        if (!nombreOk || !emailOk || !mensajeOk) {
            mostrarMensaje(
                "Por favor completá nombre, un email válido y tu mensaje.",
                "danger"
            );
            return;
        }

        mostrarMensaje(
            `¡Gracias, ${nombre.value.trim()}! Recibimos tu consulta y te responderemos en 48 horas hábiles.`,
            "success"
        );
        formulario.reset();
    });
}
