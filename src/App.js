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
      imageUrl:''
    }

  }
  onInputChange=(event) =>{
   this.state.input=event.target.value;
   console.log(this.state.input);

  }
  onButtonClick=()=>{
     this.setState({imageUrl:this.state.input});
    
      app.models.predict(Clarifai.COLOR_MODEL,this.state.input).then(
    function(response){
     console.log(response);
    },
    function (err) {
      // body...
    }

    );
  }
  render(){
    return (
    <div className="App" >

     <Particles className="particles particles-box" params={particlesOptions} />
      <Navigation/>
      <Logo />
      <Rank />
      <SearchBox onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
      
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    
    </div>
  );
}
}

export default App;
