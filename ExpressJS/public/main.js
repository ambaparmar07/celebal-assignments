// --- Auth State ---
let jwtToken = null;

function showUserSection(user) {
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('userSection').style.display = '';
}
function showAuthSection() {
  document.getElementById('authSection').style.display = '';
  document.getElementById('userSection').style.display = 'none';
}
function saveToken(token) {
  jwtToken = token;
  localStorage.setItem('jwtToken', token);
}
function loadToken() {
  jwtToken = localStorage.getItem('jwtToken');
  if (jwtToken) showUserSection();
  else showAuthSection();
}
function clearToken() {
  jwtToken = null;
  localStorage.removeItem('jwtToken');
  showAuthSection();
}

// --- Register ---
document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const resultDiv = document.getElementById('registerResult');
  resultDiv.innerHTML = '';
  const data = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
    age: form.age.value
  };
  try {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (json.success) {
      resultDiv.innerHTML = `<div class='result'>${json.message}</div>`;
      form.reset();
    } else {
      resultDiv.innerHTML = `<div class='error'>${json.error || 'Registration failed'}</div>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<div class='error'>Error: ${err.message}</div>`;
  }
});

// --- Login ---
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const resultDiv = document.getElementById('loginResult');
  resultDiv.innerHTML = '';
  const data = {
    email: form.email.value,
    password: form.password.value
  };
  try {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (json.success && json.token) {
      saveToken(json.token);
      showUserSection(json.user);
      form.reset();
      document.getElementById('loginResult').innerHTML = '';
    } else {
      resultDiv.innerHTML = `<div class='error'>${json.error || 'Login failed'}</div>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<div class='error'>Error: ${err.message}</div>`;
  }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  clearToken();
});

// --- File upload handler (protected) ---
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const fileInput = document.getElementById('fileInput');
  const resultDiv = document.getElementById('uploadResult');
  resultDiv.innerHTML = '';
  if (!fileInput.files.length) return;
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  try {
    const res = await fetch('/api/users/upload', {
      method: 'POST',
      headers: jwtToken ? { 'Authorization': 'Bearer ' + jwtToken } : {},
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      resultDiv.innerHTML = `<div class='result'>${data.message}<br>File: <a href='/uploads/${data.file.filename}' target='_blank'>${data.file.originalname}</a></div>`;
    } else {
      resultDiv.innerHTML = `<div class='error'>${data.error || 'Upload failed'}</div>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<div class='error'>Error: ${err.message}</div>`;
  }
});

// --- Fetch external posts (protected) ---
document.getElementById('fetchPostsBtn').addEventListener('click', async function() {
  const postsDiv = document.getElementById('postsResult');
  postsDiv.innerHTML = '';
  try {
    const res = await fetch('/api/users/external-posts', {
      headers: jwtToken ? { 'Authorization': 'Bearer ' + jwtToken } : {}
    });
    const data = await res.json();
    if (data.success) {
      postsDiv.innerHTML = '<ul>' + data.data.map(post => `<li><b>${post.title}</b><br>${post.body}</li>`).join('') + '</ul>';
    } else {
      postsDiv.innerHTML = `<div class='error'>${data.error || 'Failed to fetch posts'}</div>`;
    }
  } catch (err) {
    postsDiv.innerHTML = `<div class='error'>Error: ${err.message}</div>`;
  }
});

// --- On page load, check auth state ---
window.addEventListener('DOMContentLoaded', loadToken); 