import { useState ,useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchArticles, refreshArticle } from "../services/newsServices";

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    fetchArticles().then((data)=>{
        setArticles(data);
        setLoading(false);
    });
  }, []);

  function handleRefresh() {
    setLoading(true);
    refreshArticle(articles).then((updated)=>{
        setArticles(updated);
        setLoading(false);
    });
}

  return (
    <div>
      <button className="fetch-btn" onClick={handleRefresh}>
        Fetch Latest News
      </button>

      {loading && (
        <div className="status-row">
          <div className="spinner"></div>
          <span className="status">Loading...</span>
        </div>
      )}

      {!loading && articles.length === 0 && (
        <p className="status">Nothing here yet.</p>
      )}

      {articles.map((item) => (
        <ArticleCard key={item.id} id={item.id} title={item.title} source={item.source} link={item.link} />
      ))}
    </div>
  );
}

export default NewsPage;