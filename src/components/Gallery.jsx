
import React, { useState } from 'react';
import Loader from './Loader';

const Gallery = ({ images, onDelete }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const  [deletingImage, setDeletingImage] = useState(null);

  if (!images || images.length === 0) {
    return <p>No images to display.</p>;
  }
  
  const handleDeleteClick = (publicId) => {
    setDeletingImage(publicId);
    onDelete(publicId);
  };

  const handleImageClick = (image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-thumbnail">
            <img 
             className="img-thumbnail"
              src={image.secure_url} 
              alt={image.public_id} 
              onClick={() => handleImageClick(image)}
            />

        <button className='btn' onClick={() => handleDeleteClick(image.public_id)} disabled={deletingImage === image.public_id}>
            {deletingImage === image.public_id ? <Loader /> : 'Delete'}
          </button>
          </div>
        ))}
      </div>

   
      {previewImage && (
        <div className="image-modal" onClick={closePreview}>
          <div className="image-preview-content">
            <img src={previewImage.secure_url} alt={previewImage.public_id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;




