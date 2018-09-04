import React from 'react'

const API = "http://dnu5embx6omws.cloudfront.net/venues/weather.json";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    // this.sortAlpha = this.sortAlpha.bind(this);
    // this.sortTemp = this.sortTemp.bind(this);
    // this.sortLastUpdated = this.sortLastUpdated.bind(this);
    this.filterChange = this.filterChange.bind(this);

    this.state = {
      data: [],
      name: "",
      temp: "",
      lastUpdated: 0,
      country: "",
      weatherCond: "",
    };
  }

  componentDidMount() {
    fetch(API, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(response => response.json())
    .then(resData => {this.setState({
      results: data,
      name: resData._name,
      temp: resData._weatherTemp,
      lastUpdated: resData._weatherLastUpdated,
      country: resData._country._name,
      weatherCond: resData._weatherCondition
    })})
    .catch(function(error) {
      console.log('Request failed', error);
    });
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

  filterChange(e) {
    this.setState({
      filter: e.target.value
    })
  }

  render() {
    const results = this.state.data
    const name = this.state.name
    const temp = this.state.temp
    const lastUpdated = this.state.lastUpdated
    const country = this.state.country
    const weatherCond = this.state.weatherCond

    return (
      <div className="container">
        <header>
          <div className="header__div">
            <h1>Weather App</h1>
            <button className="search__btn" onClick={this.sortAlpha}>A-Z</button>
            <button className="search__btn" onClick={this.sortTemp}>Temperature</button>
            <button className="search__btn" onClick={this.sortLastUpdated}>Last Updated</button>
          </div>
        </header>
        <main>
          <div className="select__box">
            <div className="filter">
              <label>Filter</label>
              <select value={this.state.filter} onChange={this.filterChange}>
                <option value="country">Country</option>
                <option value="weather">Weather</option>
              </select>
            </div>
          </div>

          { results.map(function(resultObj, index) {
            let item = resultObj;
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
