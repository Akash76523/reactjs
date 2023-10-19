import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewImages = () => {
  const [similarImages, setSimilarImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the selected image and reset the similar images
      setSelectedImage(file);
      setSimilarImages([]);
    }
  };

  const findSimilarImages = () => {
    if (selectedImage) {
      setLoading(true);
      setError(null);

      // Now that the image is selected, get similar images
      axios
        .get(
          `http://localhost:5000/search-images?queryImageFileName=${selectedImage.name}`
        )
        .then((response) => {
          const data = response.data;

          if (
            data.similarImagePaths &&
            data.similarImagePaths.matching_group_images
          ) {
            setSimilarImages(data.similarImagePaths.matching_group_images);
          }
        })
        .catch((error) => {
          console.error("Error fetching similar images: ", error);
          setError("Internal server error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <label>
            Select an Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <button className="btn btn-primary mt-3" onClick={findSimilarImages}>
            Find Similar Images
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {similarImages.length > 0 && (
        <div className="row mt-3">
          <div className="col">
            <p className="h5">Matching Images:</p>
            <div className="image-container d-flex flex-wrap gap-5">
              {similarImages.map((imageName, index) => (
                <div key={index} className="mb-3">
                  <p className="mb-2">Image {index + 1}: {imageName}</p>
                  <img
                    src={`http://localhost:5000/static/${imageName}`}
                    alt={`Similar Image ${index}`}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewImages;
