const API_URL = "http://localhost:3001";

// Fetches whatever articles are currently stored on the backend
export async function fetchArticles() {
  const response = await fetch(`${API_URL}/api/articles`);
  const data = await response.json();
  return data;
}

// Tells the backend to fetch fresh RSS data, then returns the updated list
export async function refreshArticle() {
  // Trigger ingestion on the backend
  await fetch(`${API_URL}/api/ingest`);

  // Then fetch the newly updated article list
  const response = await fetch(`${API_URL}/api/articles`);
  const data = await response.json();
  return data;
}