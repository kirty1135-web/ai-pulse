import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NewsPage from "./pages/NewsPage";
import ResearchPage from "./pages/ResearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Header />

      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;
