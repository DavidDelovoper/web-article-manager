const API_URL = 'http://localhost:5000/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  if (token) {
    return {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  }
  return { 'Content-Type': 'application/json' };
}

export async function registerUser(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function loginUser(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function fetchArticles() {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (response.status === 401) throw new Error('Unauthorized');
  return response.json();
}

export async function addArticle(article: { url: string; tags: string[] }) {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(article),
  });
  if (response.status === 401) throw new Error('Unauthorized');
  return response.json();
}

export async function deleteArticle(id: string) {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (response.status === 401) throw new Error('Unauthorized');
}
