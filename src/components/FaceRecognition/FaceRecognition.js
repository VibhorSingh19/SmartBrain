import React from 'react';
import './FaceRecognition.css';
function FaceRecognition({imageUrl,box}) {
  return (
    <div className="center centerBlock grow shadow-2">
     <img id="inputImage" src={imageUrl} alt=""/>
     <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
     </div>

  );
}
 
export default FaceRecognition;
