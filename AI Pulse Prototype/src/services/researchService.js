const API_URL = "http://localhost:3001";

export async function fetchResearch() {
  const response = await fetch(`${API_URL}/api/research`);
  const data = await response.json();
  return data;
}