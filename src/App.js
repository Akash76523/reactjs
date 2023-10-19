import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./Chunk";
import ViewImages from "./viewimage";
import SimilarImages from "./Showimage";
import ViewFiles from "./Viewfile";


function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<FileUpload />} />
      <Route path="/view-files" element={<ViewFiles />} />
      <Route path="/view-images" element={<ViewImages />} />
      </Routes>
    </Router>
  );
}

export default App;
