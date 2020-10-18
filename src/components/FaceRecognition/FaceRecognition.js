import React from 'react';
function FaceRecognition({imageUrl}) {
  return (
    <div className="center centerBlock pa3 grow shadow-2">
     <img src={imageUrl} alt=""/>
    </div>
  );
}

export default FaceRecognition;
