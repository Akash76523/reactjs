import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [fileUrl, setFileUrl] = useState(""); // Store the file URL

  const handleFileChange = (event) => {
    const file = event.target.files;
    console.log(file);
    setSelectedFile(file);
    setFileUrl("");
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select one or more files to upload.");
      return;
    }

    // Loop through each selected file
    for (let i = 0; i < selectedFile.length; i++) {
      const file = selectedFile[i];
      const chunkSize = 5 * 1024 * 1024; // 5MB chunk size
      const totalChunks = Math.ceil(file.size / chunkSize);
      let chunkNumber = 0;

      // Upload chunks of the current file
      const uploadChunk = async () => {
        const start = chunkNumber * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkNumber", chunkNumber);
        formData.append("totalChunks", totalChunks);
        formData.append("originalname", file.name);

        try {
          const response = await axios.post(
            "http://localhost:5000/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            setStatus(
              `File ${i + 1}: Chunk ${
                chunkNumber + 1
              }/${totalChunks} uploaded successfully`
            );
            chunkNumber++;

            if (chunkNumber < totalChunks) {
              uploadChunk(); // Upload the next chunk
            } else {
              setStatus(`File ${i + 1} upload complete`);
            }
          } else {
            console.error("Error uploading chunk:", response.statusText);
          }
        } catch (error) {
          console.error("Error uploading chunk:", error);
        }
      };

      await uploadChunk();
    }
  };

  return (
    <>
      <div className="container">
        <h2>Resumable File Upload</h2>
        <h3>{status}</h3>
        <input type="file" onChange={handleFileChange} multiple />
        <Button onClick={handleFileUpload}>Upload</Button>
        <Link to="/view-files">
          <Button style={{ marginLeft: "100px" }}>View Files</Button>
        </Link>
      </div>
    </>
  );
};

export default FileUpload;
