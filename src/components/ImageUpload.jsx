import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onUpload }) => {
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      onUpload(response.data);
    } catch (error) {
      console.log('Error uploading the image:', error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>{uploading ? 'Uploading...' : 'Drag and drop an image, or click to select one'}</p>
    </div>
  );
};

export default ImageUpload;
