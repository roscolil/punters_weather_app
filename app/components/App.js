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
    fetch(API)
    .then(response => response.json())
    .then(resData => this.setState({
      data: resData.data,
    }))
    .catch(function(error) {
      console.log('Request failed', error);
    });
  }

  sortAlpha(e) {
    this.setState({
      name: e.target.value  //ascending in alphabetical order
    });
  }

  sortTemp(e) {
    this.setState({
      temp: e.target.value //descending in temp
    });
  }

  sortLastUpdated(e) {
    this.setState({
      lastUpdated: e.target.value //ascending in time order
    });
  }

  filterChange(e) {
    this.setState({
      filter: e.target.value
    })
  }

  render() {
    let results = this.state.data

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
          <div className="search__results">
            { results.map(function(resultObj, index) {
              let item = resultObj
              return (
                <div className="row" key={index}>
                  <div className="details">
                    <p>Name: <span>{item["_name"]}</span></p>
                    <p>Country: <span>{item["_country"]["_name"]}</span></p>
                    <p>Temp: <span>{item["_weatherTemp"]}</span></p>
                    <p>Weather Conditions: <span>{item["_weatherCondition"]}</span></p>
                    <p>Last Updated: <span>{item["_weatherLastUpdated"]}</span></p>
                  </div>
                </div>
                )
              })
            }
          </div>
        </main>
      </div>
    )
  }
}
