import React, { Component } from 'react';
import './App.css';
// {import Video from "./video/Video"}
import Lightning from './video/Lightning.mp4'
import Rain from './video/Rain.mp4'
import Sky from './video/Sky.mp4'
import Drizzle from './video/Drizzle.mp4'
import Snow from './video/Snow.mp4'
import Clouds1 from './video/Clouds1.mp4'

class App extends Component {
  constructor(){
    super()
    this.state = {
      key : "86f4b37e944d60d032ef1d3ee1d3031c",
      base: "https://api.openweathermap.org/data/2.5/",
      location: "",
      weather: {}
    }
  }
    onKeyUp=(event) => {
      
      if (event.key === "Enter") {
     fetch(`${this.state.base}weather?q=${this.state.location}&units=metric&appid=${this.state.key}`)
    .then(response=>response.json())
    .then(response => {
      this.setState({
         weather: response,
         location : ""
        })
          })
    } 
  }
  
  
   Datebuilder = (d) => {
    let months = ["January", "February", "March", "April",
                 "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];               
      

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let fullyear = d.getFullYear()

    return `${day} ${date} ${month} ${fullyear}`
  }

 
  handlechange = (event) => {
    const {value} = event.target

    this.setState({
      location :value
  })
  }
     render(){
      
          
       const {location}=this.state
       
       console.log(this.state.weather)
          return (

  <div className="App">
     <main>
         <div> 
              <div>
                <video 
                autoPlay
                loop
                muted
                className = "video-one"
                type="video/mp4"
                src={
                         this.state.weather.weather ? 
                         this.state.weather.weather[0].main === "Clouds" ? Clouds1 :
                         this.state.weather.weather[0].main === "Rain" ? Rain :
                         this.state.weather.weather[0].main === "Thunderstorm" ? Lightning :
                         this.state.weather.weather[0].main === "Clear" ? Sky : 
                         this.state.weather.weather[0].main === "Drrizzle" ? Drizzle:
                         this.state.weather.weather[0].main === "Snow" ? Snow :  Sky
                         :Sky
                }                      
              />
               <div className= "search-box">
                  <input
                    type = "text"
                    className= "search-bar"
                    placeholder = "Enter Location"
                    value = {location}
                    onChange = {this.handlechange}
                    onKeyPress={this.onKeyUp}
                    />
                </div> 
                { (typeof this.state.weather.main != 'undefined') ? ( 
                  <div>
                      <div className = "location-box">
                        <div className= "location">{this.state.weather.name},{this.state.weather.sys.country}</div>
                        <div className= "Date">{this.Datebuilder(new Date())}</div>
                      </div>
                      <div className="weather-box">
                        <div className="temp">{Math.round(this.state.weather.main.temp)}°C</div>
                        <div className="weather">{this.state.weather.weather[0].main}</div>
                      </div>
                  </div>
                  )
                  : 
                (<div className="alt">
                   <h1>Enter A Location</h1>
                  </div>)
       }
             </div>
         </div>
      </main> 
       
  </div>
          )
       }
  
      }
    

export default App
