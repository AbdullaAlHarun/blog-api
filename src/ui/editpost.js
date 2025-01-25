document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      window.location.href = 'index.html';  // Redirect to login if not authenticated
    }
  
    document.getElementById('postForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
  
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, content })
        });
  
        const result = await response.json();
        if (response.ok) {
          alert('Post created successfully!');
          window.location.href = 'home.html';
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
      }
    });
  });
  