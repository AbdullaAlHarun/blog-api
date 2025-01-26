const API_BASE_URL = "https://blog-api-final.vercel.app/api";

async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
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
        <div class="mt-4">
          <a href="editpost.html?id=${post.id}" class="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</a>
          <button onclick="deletePost(${post.id})" class="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
        </div>
      `;

      postList.appendChild(postCard);
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

async function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Post deleted successfully!');
        fetchPosts();  // Reload posts after deletion
      } else {
        alert('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
}
