// components/ImageCropper.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage'; // We'll implement this utility function later

Modal.setAppElement('#__next');

const ImageCropper = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(image.src, croppedAreaPixels);
    setCroppedImage(croppedImage);
  };

  const handleDone = () => {
    // You can implement the code to send croppedImage to your API here
    console.log('Cropped image:', croppedImage);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Select Image and Crop</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      {image && (
        <div>
         
          <br />
          <button onClick={handleDone}>Done</button>
        </div>
      )}
    </Modal>
  );
};

export default ImageCropper;
