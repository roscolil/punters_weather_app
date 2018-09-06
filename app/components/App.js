import React from 'react'
import moment from 'moment'

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

// Show selected results (alphabetical, temp, last updated) on button click event
  sortButtonChange(e) {
    this.setState({
      sort: e.target.value
    });
  }

// Filter results by country/weather conditions from dropdown selection
  filterSelectChange(e) {
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
            <button className="search__btn" value="alpha" onClick={this.sortButtonChange}>A-Z</button>
            <button className="search__btn" value="temp" onClick={this.sortButtonChange}>Temperature</button>
            <button className="search__btn" value="last" onClick={this.sortButtonChange}>Last Updated</button>
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
              let dateTimeString = moment(item["_weatherLastUpdated"]).format("DD-MM-YYYY HH:mm")
              return (
                <div className="row" key={index}>
                  <div className="details">
                    <p>Name: <span>{item["_name"]}</span></p>
                    <p>Country: <span>{item["_country"]["_name"]}</span></p>
                    <p>Temp: <span>{item["_weatherTemp"]}&deg;C</span></p>
                    <p>Weather Conditions: <span>{item["_weatherCondition"]}</span></p>
                    <p>Last Updated: <span>{dateTimeString}</span></p>
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
