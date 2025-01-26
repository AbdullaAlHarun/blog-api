const API_BASE_URL = "https://blog-api-final.vercel.app/api";

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !email || !password) {
    document.getElementById('message').innerText = 'All fields are required.';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();
    if (response.ok) {
      document.getElementById('message').innerText = 'User registered successfully! Redirecting to login...';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      document.getElementById('message').innerText = result.message;
    }
  } catch (error) {
    document.getElementById('message').innerText = 'Registration failed. Please try again.';
    console.error('Registration error:', error);
  }
});
