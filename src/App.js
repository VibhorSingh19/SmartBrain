import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/logo/logo';
import SearchBox from './components/imageLinkerForm/imageLinkerForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
//import Particles from "react-particles-js";
//import { particlesOptions } from "./particlesOptions";
const particleOption={

                   particles:{
                    number:{
                      value:30,
                      density: {
                        enable: true,
                        value_area: 800
                      }
                    }
                   }
}
function App() {
  return (
    <div className="App">
      <Particles className="particles" 
              params={{
                particles: {
                  number:{
                      value:70,
                      density: {
                        enable: true,
                        value_area: 800,
                         line_linked: {
                    shadow: {
                     enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }
                  }
                }
              }
}
      />
      <Navigation/>
      <Logo />
      <Rank/>
      <SearchBox/>
      {/*
      
      <FaceRecognition>
    */}
    </div>
  );
}

export default App;
