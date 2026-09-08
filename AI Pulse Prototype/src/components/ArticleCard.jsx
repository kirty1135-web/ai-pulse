import { useState } from "react";
import { isBookmarked, addBookmark, removeBookmark } from "../services/bookmarkService";

function ArticleCard({ id, title, source, link, onBookmarkChange }) {
  const [bookmarked, setBookmarked] = useState(isBookmarked(id));

  function handleBookmarkClick(e) {
    e.preventDefault(); // stop the click from also opening the article link
    if (bookmarked) {
      removeBookmark(id);
      setBookmarked(false);
    } else {
      addBookmark({ id, title, source, link });
      setBookmarked(true);
    }
  }

  return (
    <a href={link} target="_blank" rel="noreferrer" className="card">
      <div className="card-top">
        <h3 className="card-title">{title}</h3>
        <button
          className={bookmarked ? "bookmark-btn active" : "bookmark-btn"}
          onClick={handleBookmarkClick}
          aria-label="Bookmark"
        >
          {bookmarked ? "★" : "☆"}
        </button>
      </div>
      <span className="card-badge">{source}</span>
    </a>
  );
}

export default ArticleCard;