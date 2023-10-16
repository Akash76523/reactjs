import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of files from the server when the component mounts
    axios
      .get("http://localhost:5000/viewfiles")
      .then((response) => {
        // Check if response.data is an array before setting it
        if (Array.isArray(response.data)) {
          setFiles(response.data);
        } else {
          console.error("Invalid data received:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <h2>View Files</h2>
      <div className="image-list d-flex flex-wrap gap-5">
        {files.map((file) => (
          <div key={file.id} className="image-item">
            <img
              src={file.fileDataUrl}
              alt={`Image ${file.id}`}
              style={{ height: "200px", width: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewFiles;
