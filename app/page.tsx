"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Avatar from "react-avatar-edit";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const MyPage = () => {
  const [image, setImage] = useState(null)
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onCrop = (i: React.SetStateAction<null>) => {

    setImage(i)
  };

  const onClose = (i) => {
    closeModal();
  };

  const onBeforeFileLoad = (elem: { target: { files: { size: number; }[]; value: string; }; }) =>{
    if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  const uploadImage = ()=>{
    console.log(image);
    //do rest of logic to upload image
  }
  return (
    <div className="home ">
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>

        <Avatar
          width={390}
          height={295}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          // src={state.src} //for old pic
        />
        <div className="text-black">Preview of that image </div>
        <img src={image?image:""} alt="Preview" />
        <button onClick={uploadImage} className="text-black" >Upload</button>
      </Modal>
    </div>
  );
};

export default MyPage;
