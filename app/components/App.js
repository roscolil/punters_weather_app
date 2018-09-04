import React from 'react'

const API = "http://dnu5embx6omws.cloudfront.net/venues/weather.json";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.sortAlpha = this.sortAlpha.bind(this);
    this.sortTemp = this.sortTemp.bind(this);
    this.sortLastUpdated = this.sortLastUpdated.bind(this);

    this.state = {
      data: null,
      name: "",
      temp: "",
      lastUpdated: 0,
      country: "",
      weatherCond: ""
    };
  }

  // sortAlpha() {
  //   this.setState({
  //     name: //ascending in alphabetical order
  //   });
  // }
  //
  // sortTemp() {
  //   this.setState({
  //     temp: //descending in temp
  //   });
  // }
  //
  // sortLastUpdated() {
  //   this.setState({
  //     lastUpdated: //ascending in time order
  //   });
  // }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({
        name: data._name,
        temp: data._weatherTemp,
        lastUpdated: data._weatherLastUpdated,
        country: data._country._name,
        weatherCond: data._weatherCondition
      }));
  }

  render() {
    const name = this.state.name
    const temp = this.state.temp
    const lastUpdated = this.state.lastUpdated
    const country = this.state.country
    const weatherCond = this.state.weatherCond

    return (
        <div>
          <header>
            <div className="header__div">
              <h1>Weather App</h1>
              <button className="search__btn" onClick={this.clickSelection}>A-Z</button>
              <button className="search__btn" onClick={this.clickSelection}>Temperature</button>
              <button className="search__btn" onClick={this.clickSelection}>Last Updated</button>
            </div>
          </header>
          <main>
            { results.map(function(resultObj, index) {
              let item = resultObj.restaurant
              return (
                <div className="row" key={index}>
                  <div className="details">
                    <p>Name: <span>{item.name}</span></p>
                    <p>Country: <span>{item.country}</span></p>
                    <p>Temp: <span>{item.temp}</span></p>
                    <p>Weather Conditions: <span>{item.weatherCond}</span></p>
                    <p>Last Updated: <span>{item.lastUpdated}</span></p>
                  </div>
                </div>
                )
            })
          }
          </main>
        </div>
    )
  }
}
