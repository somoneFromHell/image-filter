import React, { createRef } from "react";
import Avatar from "react-avatar-edit";
import { useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div>
        <Avatar
          width={400}
          height={400}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={null}
        />
        <div ref={ref} className="card mt-5">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className=" img-fluid"
              style={{width:"250px",margin:"100px"}}
            />
          )}
          <img
            className="   img-fluid"
            src={selectedImage}
            style={{width:"450px",marginTop: preview ? "-450px" : "0"}}

            alt="Centered Image"
          />
        </div>
        {preview&&<button className="btn btn-primary mt-3" onClick={downloadScreenshot}>
          Download Image
        </button>}
        
      </div>
    </div>
  );
}
export default App;
