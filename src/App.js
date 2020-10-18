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
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

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
      rout:"SignIn",
      isSignedIn:false
    }

  }
  onInputChange=(event) =>{
   this.state.input=event.target.value;
   console.log(this.state.input);
 }

  calculateFaceLocation=(data)=>{
   const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
   //console.log(clarifaiFace);
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
  //console.log(box.topRow);
}
  
  onButtonClick=()=>{
     this.setState({imageUrl:this.state.input});
    
      app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    //console.log(response.outputs[0].data.regions[0].region_info.bounding_box;); 
    //<div className="bounding-box" style={{top: box.topRow,right: box.rightCol,bottom: box.bottomRow,left: box.leftCol}}></div>
   
  }
  onRouteChange=(route)=>{
   this.setState({rout:route});
   if(this.state.rout==='home')
   {
    this.setState({isSignedIn:true});
  }
   else
   {
   this.setState({isSignedIn:false});
  }
  }
  render(){
    return (
    <div className="App" >
     
     <Particles className="particles particles-box" params={particlesOptions} />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
      {
        this.state.rout==='home' ?<div>
      <Logo />
      <Rank />
      <SearchBox onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
      
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
          
        :
        this.state.rout==='SignIn' ?
        <SignIn onRouteChange={this.onRouteChange}/>
        :
        <Register onRouteChange={this.onRouteChange}/>
        
      }
      
      
    
    </div>
  );
}
}

export default App;
