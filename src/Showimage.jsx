import React, { useState, useEffect } from "react";
import axios from "axios";

const SimilarImages = () => {
  const [similarImages, setSimilarImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryImageFileName = "virat 2.jpeg"; 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/search-images?queryImageFileName=${queryImageFileName}`)
      .then((response) => {
        const data = response.data;
        if (data.success && data.all_group_images) {
          const imageUrls = data.all_group_images.map((imageName) => `http://localhost:5000/images/${imageName}`);
          setSimilarImages(imageUrls);
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
      {similarImages.length > 0 && (
        <div>
          <p>Matching Images:</p>
          <div className="image-container">
            {similarImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Similar Image ${index}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SimilarImages;
