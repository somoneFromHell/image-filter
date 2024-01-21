import React, { useRef, useState } from 'react';
import './filter.css'; // Create this file for styling
import image from '../assets/frame1.png'
import selectIcon from '../assets/assign.png'
import html2canvas from 'html2canvas';

const ImageCenter = () => {

    const imageRef = useRef(null);

    const takeScreenshotAndDownload = () => {
        html2canvas(document.body).then((canvas) => {
            // Convert canvas to data URL
            const screenshotDataUrl = canvas.toDataURL();
      
            // Create a temporary link element
            const downloadLink = document.createElement('a');
            downloadLink.href = screenshotDataUrl;
            downloadLink.download = 'screenshot.png'; // Set the filename
      
            // Trigger a click event to initiate the download
            downloadLink.click();
          });
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = React.createRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (event) => {
            setSelectedImage(event.target.result);
          };
    
          reader.readAsDataURL(file);
        }
      };
      const handleImageClick = () => {
        // Trigger the click event of the hidden file input
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };

  return (
    <>

<div className="center-container">
     


{/* <div class="circular--portrait"> */}
<img
      style={{ width: '400px',position: "relative" , height: "400px", cursor: 'pointer' ,borderRadius:"50%",overflow:"hidden"}}
      src={selectedImage || selectIcon} // Replace with your image URL or a placeholder
      alt="Selected"
      className="center-image"
      onClick={handleImageClick}
     
      />

{/* </div> */}
    
    
      <input  type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}/>

<img
      style={{ width: '700px', cursor: 'pointer',marginLeft:"-550px"}}
      onClick={handleImageClick}
        src={image} // Replace with your image URL
        alt="Centered Image"
        className="center-image"
      />
        </div>
        <button
  onClick={takeScreenshotAndDownload}
  style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
  }}
>
  Download Image
</button>


    </>
    
  );
};

export default ImageCenter;
