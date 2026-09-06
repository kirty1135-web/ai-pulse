const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());

const parser = new Parser();
const db = new Database("aipulse.db"); // creates a file on disk if it doesn't exist

// Create the table once, if it doesn't already exist.
// "id TEXT PRIMARY KEY" means no two rows can share the same id —
// this is what will stop duplicate articles from piling up.
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT,
    link TEXT,
    source TEXT,
    published TEXT
  )
`);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.get("/api/ingest", async (req, res) => {
  const feedUrl = "https://hnrss.org/frontpage";

  try {
    const feed = await parser.parseURL(feedUrl);

    // "INSERT OR IGNORE" means: try to add this row, but if a row with
    // the same id already exists, silently skip it instead of erroring.
    // This is how we avoid duplicate articles on repeated ingestion.
    const insert = db.prepare(`
      INSERT OR IGNORE INTO articles (id, title, link, source, published)
      VALUES (?, ?, ?, ?, ?)
    `);

    let newCount = 0;
    for (const item of feed.items) {
      const id = item.guid || item.link;
      const result = insert.run(id, item.title, item.link, "Hacker News", item.pubDate);
      if (result.changes > 0) newCount++;
    }

    res.json({ message: `Ingestion done. ${newCount} new articles saved.` });
  } catch (error) {
    console.log("Ingestion failed:", error.message);
    res.status(500).json({ message: "Ingestion failed", error: error.message });
  }
});

app.get("/api/articles", (req, res) => {
  // Read straight from the database, newest-looking first isn't guaranteed
  // by insertion order in SQLite, so we don't sort here yet — that's a
  // nice next upgrade once "published" dates are reliably parseable.
  const articles = db.prepare("SELECT * FROM articles").all();
  res.json(articles);
});

app.get("/api/research", async (req, res) => {
  const url = "http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=15";

  try {
    const response = await fetch(url);
    const xmlText = await response.text();

    const titleMatches = [...xmlText.matchAll(/<title>([\s\S]*?)<\/title>/g)];
    const linkMatches = [...xmlText.matchAll(/<id>(http:\/\/arxiv\.org\/abs\/[^<]+)<\/id>/g)];

    const papers = titleMatches.slice(1).map((match, i) => ({
      id: linkMatches[i] ? linkMatches[i][1] : `paper-${i}`,
      title: match[1].trim().replace(/\s+/g, " "),
      link: linkMatches[i] ? linkMatches[i][1] : "",
      source: "arXiv",
    }));

    res.json(papers);
  } catch (error) {
    console.log("arXiv fetch failed:", error.message);
    res.status(500).json({ message: "Failed to fetch research", error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});