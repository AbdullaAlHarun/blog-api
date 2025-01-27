const API_BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000/api"
  : "https://blog-api-final.vercel.app/api";

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('username', result.username);
          window.location.href = 'home.html';
        } else {
          document.getElementById('message').innerText = result.message;
        }
      } catch (error) {
        document.getElementById('message').innerText = 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
});
