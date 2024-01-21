import React, { createRef } from "react";
import Avatar from "react-avatar-edit";
import { useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import './App.css'

import selectedImage from './assets/frame1.png'
// import selectIcon from '../assets/assign.png'
// import html2canvas from 'html2canvas';




function App() {
  const ref = createRef(null);

  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => {
    console.log("Before taking screenshot");
    takeScreenShot(ref.current)
      .then((image) => {
        console.log("Screenshot taken successfully");
        download(image);
      })
      .catch((error) => {
        console.error("Error taking screenshot", error);
      });
  };
  

  const [preview, setPreview] = useState(null);
  function onClose() {
    setPreview(null);
  }
  function onCrop(pv) {
    setPreview(pv);
  }
  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 701680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }
  return (
    <div >
      <Avatar
        width={300}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={null}
      />
     <div style={{ position: 'relative' }}>

    

     <div
        ref={ref}
       className="card"
      >
  {preview && (
    <img
      src={preview}
      alt="Preview"
      className="previewImage"
      // style={{ width: '200px',marginTop:"100px",marginLeft:"95px", cursor: 'pointer', position: 'absolute', top: '0', left: '0' }}
    />
  )}
    <img
      // style={{ width: '380px',marginTop:"10px",marginLeft:"10px", cursor: 'pointer', position: 'absolute', top: '0', left: '0' }}
    className="centeredImage"
    src={selectedImage} // Replace with your image URL
    alt="Centered Image"
  />
   </div>
</div>

       <button onClick={downloadScreenshot}>Download image</button>
    </div>
  );
}
export default App;
