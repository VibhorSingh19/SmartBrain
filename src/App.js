import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/logo/logo';
import SearchBox from './components/imageLinkerForm/imageLinkerForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import { particlesOptions } from "./ParticlesOptions";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const initialiseState={
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

class App extends Component {
 
  constructor(){
    super();
    this.state=initialiseState;
  
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
    fetch('https://frozen-cove-73919.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
    .then(response => response.json())
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('https://frozen-cove-73919.herokuapp.com/image', {
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
             .catch(console.log);
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
    this.setState(initialiseState);
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
        <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        :
        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        
      }
    </div>
  );
}
}
export default App;