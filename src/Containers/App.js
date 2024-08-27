import { Component } from 'react';
import Particles from "react-tsparticles";
import './App.css';
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition'
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Profile from '../components/Profile/Profile';


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    move: {
      enable: true,
      speed: 2,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 3,
    },
  },
};


const initialState = {
  input : "",
  imageUrl:"",
  box:{},
  route: "signIn",
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined : ''
  }
}

class App extends Component {

constructor(){
  super();
  this.state = initialState;
}


loadUser = (data) =>{
  this.setState({
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined : data.joined
    }
  })
}

calculateFaceLocation = (box) =>{
 
  const image = document.getElementById("inputImage");
   const width = Number(image.width);
   const height = Number(image.height);
 
  return {
    leftCol :box.left_col *width,
    topRow : box.top_row * height,
    rightCol : width - (box.right_col*width),
    bottomRow :height - (box.bottom_row *height)
  }
}

displayFaceBox = (box) => {
this.setState({box:box});
}

onInputChange = (event) => {
  this.setState({input:event.target.value});
}

onRouteChange = (route) =>{
  if(route=== "signout"){
    this.setState(initialState)
  }else if (route === "home"){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route});
}

onButtonSubmit = () => {
  this.setState({imageUrl:this.state.input});
  const IMAGE_URL = this.state.input;
// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = '9d7a56f6b1414e699249357e50f26742';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
//const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                    // "base64": IMAGE_BYTES_STRING
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};

fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {
        const regions = result.outputs[0].data.regions;
        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);
            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                fetch('http://localhost:3000/image',{
                  method:'put',
                  headers:{'Content-Type':'application/json'},
                  body:JSON.stringify({
                    id: this.state.user.id
                  })  
                })
                .then(resp=>resp.json())
                .then(count=>{
                  this.setState(Object.assign(this.state.user, {entries : count}))
                }).catch(console.log)
                this.displayFaceBox(this.calculateFaceLocation(boundingBox));
            });
        });
        
    })
    
    .catch(error => console.log('error', error));
    
}



  render(){


    return (
      <div className="App">
         <Particles className="particles" params = {particlesOptions}/>
          <Navigation  onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>

        { this.state.route === "home" 
          ?
           ( <div> 
              <Logo />
              <Rank name={this.state.user.name} 
                    entries={this.state.user.entries}
              />
              <ImageLinkForm 
              onInputChange = {this.onInputChange} 
              onButtonSubmit = {this.onButtonSubmit}
              />
              <FaceRecognition box = {this.state.box} imageUrl= {this.state.input}/>
            </div>
            )
          : this.state.route === "signIn"  ? (<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />)
          : this.state.route === "register" ? (<Register onRouteChange={this.onRouteChange} loadUser = {this.loadUser}/>)
          : this.state.route === "profile"  ? (<Profile onRouteChange={this.onRouteChange} id={this.state.user.id}/>)
          : (<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />)
        }
      </div>
    );
  }
}

export default App;
