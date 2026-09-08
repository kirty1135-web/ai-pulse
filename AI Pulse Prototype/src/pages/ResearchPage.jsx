import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchResearch } from "../services/researchService";

function ResearchPage() {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResearch().then((data) => {
      setResearch(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading && (
        <div className="status-row">
          <div className="spinner"></div>
          <span className="status">Loading...</span>
        </div>
      )}

      {!loading && research.length === 0 && (
        <p className="status">Nothing here yet.</p>
      )}

      {research.map((item) => (
        <ArticleCard key={item.id} id={item.id} title={item.title} source={item.source} link={item.link} />
      ))}
    </div>
  );
}

export default ResearchPage;