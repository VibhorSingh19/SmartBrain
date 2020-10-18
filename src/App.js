import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/logo/logo';
import SearchBox from './components/imageLinkerForm/imageLinkerForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import { particlesOptions } from "./ParticlesOptions";
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
const app = new Clarifai.App({
 apiKey: '6744cbc8104940eba90468d428f3383f'
});

class App extends Component {
 
  constructor(){
    super();
    this.state={

      input:'',
      imageUrl:'',
      box:{},
    }

  }
  onInputChange=(event) =>{
   this.state.input=event.target.value;
   console.log(this.state.input);
 }

  calculateFaceLocation=(data)=>{
   const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
   const inputImage=document.getElementById("inputImage");
   const width=Number(inputImage.width);
   const height=Number(inputImage.height);
   return{
    leftCol: clarifaiFace.left_col*width,
    topRow: clarifaiFace.top_row*height,
    rightCol: width-(clarifaiFace.right_col*width),
    bottomRow: height-(clarifaiFace.bottom_row*height)
    
   }
  }
displayFaceBox=(box)=>{
  this.setState({box:box});

}
  
  onButtonClick=()=>{
     this.setState({imageUrl:this.state.input});
    
      app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    //console.log(response.outputs[0].data.regions[0].region_info.bounding_box;); 
    
  }
  
  render(){
    return (
    <div className="App" >

     <Particles className="particles particles-box" params={particlesOptions} />
      <Navigation/>
      <Logo />
      <Rank />
      <SearchBox onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
      
      <FaceRecognition cox={this.state.box} imageUrl={this.state.imageUrl}/>
    
    </div>
  );
}
}

export default App;
