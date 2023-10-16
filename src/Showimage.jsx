import React, { useState, useEffect } from "react";
import axios from "axios";

const SimilarImages = () => {
  const [similarImagePaths, setSimilarImagePaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryImageFileName = 'download (5).jpeg'; // Replace with the actual query image file name

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/search-images?queryImageFileName=${queryImageFileName}`)
      .then((response) => {
        const data = response.data;
        if (data.similarImagePaths && data.similarImagePaths.length > 0) {
          setSimilarImagePaths(data.similarImagePaths);
        } else {
          setError("No similar images found");
        }
      })
      .catch((error) => {
        console.error("Error fetching similar images: ", error);
        setError("Internal server error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryImageFileName]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {similarImagePaths.length > 0 && (
        <div>
          <p>Matching Image (Cricketer MS Dhoni):</p>
          {queryImageFileName === 'download (9).jpeg' && similarImagePaths.length > 0 && (
            <img src={similarImagePaths[0]} alt="Cricketer MS Dhoni" />
          )}
          {queryImageFileName !== 'download (9).jpeg' && (
            <p>Query image is not Cricketer MS Dhoni.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimilarImages;
