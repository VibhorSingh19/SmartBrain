import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/logo/logo';
import SearchBox from './components/imageLinkerForm/imageLinkerForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import { particlesOptions } from "./ParticlesOptions";
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '6744cbc8104940eba90468d428f3383f'
});

class App extends Component {
 
  constructor(){
    super();
    this.state={

      input:'',
    }

  }
  onInputChange=(event) =>{
   this.state.input=event.target.value;
   console.log(this.state.input);

  }
  onButtonClick=()=>{

    app.models.predict('6744cbc8104940eba90468d428f3383f',"https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/prototypen/w_sexy_gr.jpg").then(
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
      <Rank/>
      <SearchBox onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
      {/*
       6744cbc8104940eba90468d428f3383f  
      <FaceRecognition>
    */}
    </div>
  );
}
}

export default App;
