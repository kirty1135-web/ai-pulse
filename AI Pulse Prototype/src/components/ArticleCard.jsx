function ArticleCard({ title, source, link }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="card">
      <h3 className="card-title">{title}</h3>
      <span className="card-badge">{source}</span>
    </a>
  );
}

export default ArticleCard;