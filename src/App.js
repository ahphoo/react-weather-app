import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "a451308429037acea7e9d39a52c28913";

class App extends React.Component {
  
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {

    // Prevent full page refresh
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    // If data could be fetched
    if ( city && country ) {
      
      console.log(data);

      // Don't directly modify the state, use this.setState({}); instead!
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }
    else if( city ) {
      
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a valid country."
      });
    }
    else if( country ) {
      
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a valid city."
      });
    }
    else {
      
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a valid city and country."
      });
    }
  }

  render () {
    return(
      <div>
        <div className = "wrapper">
          <div className = "main">
            <div className = "container">
              <div className = "row">
                
                <div className = "col-xs-5 title-container">
                  <Titles />
                </div>
                <div className = "col-xs-7 form-container">
                  <Form getWeather = {this.getWeather} />
                  <Weather 
                    temperature = {this.state.temperature}
                    city        = {this.state.city}
                    country     = {this.state.country}
                    humidity    = {this.state.humidity}
                    description = {this.state.description}
                    error       = {this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>         
    );
  }
}

export default App;
