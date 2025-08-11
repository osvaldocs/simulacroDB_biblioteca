// Escuchar evento submit del formulario de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evitar que el formulario recargue la página

  // Obtener valores ingresados en los inputs email y password
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    // Enviar petición POST al backend con email y password en formato JSON
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // Parsear respuesta JSON
    const data = await res.json();

    if (res.ok) {
      // Login exitoso: mostrar mensaje y redirigir a dashboard
      document.getElementById('message').textContent = 'Login exitoso!';
      window.location.href = 'dashboard.html';
    } else {
      // Login fallido: mostrar mensaje de error enviado por backend o mensaje genérico
      document.getElementById('message').textContent = data.message || 'Error en login';
    }
  } catch (error) {
    // Error en conexión o petición: mostrar mensaje de error
    document.getElementById('message').textContent = 'Error de conexión';
  }
});
