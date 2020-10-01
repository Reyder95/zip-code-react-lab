import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div>
      <h5>{props.city}, {props.state}</h5>
      <ul>
        <li>State: {props.state}</li>
        <li>Location: ({props.lat}, {props.long})</li>
        <li>Population (estimated): {props.population}</li>
        <li>Total Wages: {props.wages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (<div><input type="text" onChange={props.handleSearch} value={props.searchText}/></div>);
}

function RenderCities(props) {

  if (props.data.length > 0) {
    return (
      <div>
        {
          props.data.map((city, index) => (
            <City 
            key={index} 
            city={city.City} 
            state={city.State}
            location={city.Location}
            lat={city.Lat}
            long={city.Long}
            population={city.EstimatedPopulation}
            wages={city.TotalWages}
            />
          ))
        }
      </div>
    )
  }
  else
  {
    return <div>No Results!</div>
  }
  
}


class App extends Component {

  constructor(props) {
    super(props)

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  state = {
    searchField: '',
    data: []
  }

  fetchApi(value) {
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${value}`)
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
    .then(results => {
      this.setState({
        data: results
      })
      console.log(results)
    })
    .catch(err => {
      console.log(err)
    })  
  }

  handleSearchChange(event) {
    this.setState({
      searchField: event.target.value
    })

    if (event.target.value.length == 5) {
      this.fetchApi(event.target.value)
    }
  }

  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField 
        handleSearch={this.handleSearchChange}
        searchText={this.state.searchField}
        />

        <RenderCities data={this.state.data}/>
        
      </div>
    );
  }
}

export default App;
