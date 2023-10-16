import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./Chunk";
import ViewFiles from "./Viewfile";
import SimilarImages from "./Showimage";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<FileUpload />} />
      <Route path="/view-files" element={<SimilarImages />} />
      </Routes>
    </Router>
  );
}

export default App;
