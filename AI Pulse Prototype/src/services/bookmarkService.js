// Bookmarks are stored in the browser itself (localStorage), not the backend.
// This means they're personal to this browser/computer — simple, but real.

const STORAGE_KEY = "ai-pulse-bookmarks";

export function getBookmarks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isBookmarked(id) {
  const bookmarks = getBookmarks();
  return bookmarks.some((item) => item.id === id);
}

export function addBookmark(article) {
  const bookmarks = getBookmarks();
  if (isBookmarked(article.id)) return bookmarks; // avoid duplicates
  const updated = [...bookmarks, article];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function removeBookmark(id) {
  const bookmarks = getBookmarks();
  const updated = bookmarks.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}