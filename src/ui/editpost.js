const API_BASE_URL = "https://blog-api-final.vercel.app/api";

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!token) {
    window.location.href = 'index.html';  // Redirect to login if not authenticated
  }

  if (postId) {
    document.getElementById('formHeading').innerText = 'Edit Post';
    document.getElementById('submitButton').innerText = 'Update Post';
    document.getElementById('pageTitle').innerText = 'Edit Post';

    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const post = await response.json();
      document.getElementById('title').value = post.title;
      document.getElementById('content').value = post.content;
      document.getElementById('postId').value = post.id;
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }

  document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const postId = document.getElementById('postId').value;
    const method = postId ? 'PUT' : 'POST';
    const url = postId ? `${API_BASE_URL}/posts/${postId}` : `${API_BASE_URL}/posts`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });

      const result = await response.json();
      if (response.ok) {
        alert(postId ? 'Post updated successfully!' : 'Post created successfully!');
        window.location.href = 'home.html';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error processing post:', error);
      alert('Failed to process post. Please try again.');
    }
  });
});
