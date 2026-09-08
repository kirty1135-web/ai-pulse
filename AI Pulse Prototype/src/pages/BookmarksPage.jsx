import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { getBookmarks } from "../services/bookmarkService";

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  // Re-read from localStorage every time this page is opened,
  // so it always reflects the latest saved/removed bookmarks
  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  // Called by ArticleCard indirectly — see note below
  function refreshList() {
    setBookmarks(getBookmarks());
  }

  return (
    <div>
      {bookmarks.length === 0 && (
        <p className="status">
          No bookmarks yet. Tap the star on any article to save it here.
        </p>
      )}

      {bookmarks.map((item) => (
        <ArticleCard
          key={item.id}
          id={item.id}
          title={item.title}
          source={item.source}
          link={item.link}
          onBookmarkChange={refreshList}
        />
      ))}
    </div>
  );
}

export default BookmarksPage;