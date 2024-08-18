import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import Gallery from './Gallery';
import axios from 'axios';

const App = () => {

  const [images, setImages] = useState([]);

  const handleUpload = (imageData) => {
    setImages([...images, imageData]);
  };

  const [deletingImage, setDeletingImage] = useState(null);
  const handleDelete = async (publicId) => {
    setDeletingImage(publicId);
    try {
      const response = await axios.post('http://localhost:5000/delete-image', {
        public_id: publicId,
      });
  
      if (response.data.result) {
        setImages(images.filter((image) => image.public_id !== publicId));
      }
    } catch (error) {
      console.error('Error deleting the image:', error);
    }  finally {
      setDeletingImage(null);
    }
  };

  return (
    <div className="app">
      <h1>Cloudinary Gallery</h1>
      <ImageUpload onUpload={handleUpload} />
      <div className='gallery-image-div'>
      <Gallery images={images} onDelete={handleDelete} />
      </div>
   
    </div>
   
  );
};

export default App;
