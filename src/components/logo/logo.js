 
import React from 'react';
import Tilt from 'react-tilt'
import './logo.css';
import brain from './logo.png';
function logo() {
  return (
    <Tilt className="Tilt ma4 br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner pa3"> <img style={{paddingTop:'5px'}} alt="LOGO" src={brain} /></div>
</Tilt>
  );
}

export default logo;




