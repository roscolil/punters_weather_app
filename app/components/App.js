import React from 'react'

const API = "http://dnu5embx6omws.cloudfront.net/venues/weather.json";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.sortButtonChange = this.sortButtonChange.bind(this);
    this.filterSelectChange = this.filterSelectChange.bind(this);

    this.state = {
      data: [],
      sort: "",
      filter: ""
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

  sortButtonChange(e) {
    this.setState({
      sort: e.target.value        // Show selected results (alphabetical, temp, last updated)
    });
  }


  filterSelectChange(e) {
    this.setState({
      filter: e.target.value     // Filter results by country/weather conditions
    })
  }

  render() {
    let results = this.state.data

    return (
      <div className="container">
        <header>
          <div className="header__div">
            <h1>Weather App</h1>
            <button className="search__btn" value="alpha" onClick={this.sortButtonChange}>A-Z</button>
            <button className="search__btn" value="temp" onClick={this.sortButtonChange}>Temperature</button>
            <button className="search__btn" value="recent" onClick={this.sortButtonChange}>Last Updated</button>
            <div className="select__box">
              <div className="filter">
                <label>Filter</label>
                <select value={this.state.filter} onChange={this.filterSelectChange}>
                  <option value="country">Country</option>
                  <option value="weather">Weather</option>
                </select>
              </div>
            </div>
          </div>
        </header>
        <main>
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
