document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Assuming username is stored after login

  if (!token) {
    window.location.href = 'index.html';  // Redirect to login if not authenticated
  }

  // Display the username in navbar
  document.getElementById('username').innerText = `Welcome, ${username || 'Guest'}`;

  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 401) {
        window.location.href = 'index.html';  // Redirect if token is invalid
      }

      const posts = await response.json();
      let postList = document.getElementById('postList');
      postList.innerHTML = '';

      posts.forEach(post => {
        let postCard = document.createElement('div');
        postCard.className = "bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg";

        postCard.innerHTML = `
          <h2 class="text-xl font-bold text-gray-800">${post.title}</h2>
          <p class="text-gray-600 mt-2">${post.content.substring(0, 100)}...</p>
          <div class="mt-4 text-sm text-gray-500">Posted by ${post.author}</div>
        `;

        postList.appendChild(postCard);
      });

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  fetchPosts();
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'index.html';
}
