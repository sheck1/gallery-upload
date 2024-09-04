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
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">Cloudinary Gallery</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" >Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">gallery</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">features</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      
      <ImageUpload onUpload={handleUpload} />
      <div className='gallery-image-div'>
      <Gallery images={images} onDelete={handleDelete} />
      </div>
   
    </div>
   
  );
};

export default App;
