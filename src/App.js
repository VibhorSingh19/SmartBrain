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
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries: 0,
        joined:''
      }

  }
}

 loadUser=(data)=>{
 this.setState({user:{
  id: data.id,
  name: data.name,
  email: data.email,
  entries: data.entries,
  joined: data.joined
 }})
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
     this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
        // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
        // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
        // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
        // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
        // so you would change from:
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        // to:
        // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
/*{
        if(response){
          fetch('http://localhost:3000/image'),{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
            })
        }
      .then(response=>response.json())
      .then(count=>{
        this.setState({users:{


          entries:count
        }})
      })
      
                        
}*/
        
    //console.log(response.outputs[0].data.regions[0].region_info.bounding_box;); 
    //<div className="bounding-box" style={{top: box.topRow,right: box.rightCol,bottom: box.bottomRow,left: box.leftCol}}></div>
   
  }
  onRouteChange=(route)=>{
   this.setState({rout:route});
   if(route==='SignIn')
   {
    this.setState({isSignedIn:false});
  }
  else if(route==='register')
   {
   this.setState({isSignedIn:false});
  }
   else if(route==='home')
   {
    this.setState({isSignedIn:true});
    
  }
  }
  render()
  {
    return (
    <div className="App" >
     
     <Particles className="particles particles-box" params={particlesOptions} />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
      {
        this.state.rout==='home' ?<div>
      <Logo />
      <Rank 
       name={this.state.user.name}
       entries={this.state.user.entries}
      />
      <SearchBox onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
      
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
          
        :
        this.state.rout==='SignIn' ?
        <SignIn onRouteChange={this.onRouteChange}/>
        :
        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        
      }
    </div>
  );
}
}
export default App;