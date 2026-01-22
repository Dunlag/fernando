document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.floating-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener valores
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Simular envío
        alert(`Formulario enviado!\n\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`);

        // Resetear formulario
        form.reset();
    });
});
