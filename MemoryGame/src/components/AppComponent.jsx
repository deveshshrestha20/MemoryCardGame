import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import ButtonOpen from "./ButtonOpen";

const AppComponent = () => {
  const BASE_URL = "https://picsum.photos/"; // Picsum Photos base URL
  const NUM_IMAGES = 6; // Number of unique images to fetch
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = [];

        for (let i = 0; i < NUM_IMAGES; i++) {
          const imageUrl = `${BASE_URL}${200 + i * 50}/${300}`; // Example dimensions, change as needed
          fetchedImages.push(imageUrl);
        }

        // Duplicate the images to have pairs
        const duplicatedImages = [...fetchedImages, ...fetchedImages];

        // Shuffle the array
        const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5);

        setImages(shuffledImages);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      
      <div className="grid grid-cols-3 gap-2 p-4 place-items-stretch">
        {images.map((image, index) => (
          <CardComponent key={index} image={image} />
        ))}
      </div>
    </div>
  );
};

export default AppComponent;
