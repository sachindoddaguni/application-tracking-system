import React, { Component } from 'react'

export default class QuizPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fileName: "",
      fileuploadname: "",
      level: "",
      areaOfInterest: "",
      handleAreaOfInterestChange: "",
      preferredLocations: "",
      locations : [
        'California Bay Area',
        'Raleigh',
        'Chicago',
        'NYC',
        'Boston',
        'Miami',
        'Remote (US)'
      ]
    }
    console.log("***");
    console.log(localStorage.getItem('token'));
  }

  handleLevelChange = (event) => {
    this.setState({level : event.target.value})
  };

  handleAreaOfInterestChange = (event) => {
    this.setState({ areaOfInterest : event.target.value});
  };
  /*
  handleLocationChange = (event) => {
    let selectedLocation = event.target.value;
    console.log()
    let locJson = this.state.preferredLocations
    if (this.state.preferredLocations.includes(selectedLocation)) {
        let pl = locJson.filter((loc) => loc !== selectedLocation)
        this.setState({preferredLocations: pl})
    } else {
        locJson.push(locJson)
    }
    this.setState({preferredLocations: locJson});

  };
  */
  handleLocationChange = (event) => {
    let selectedLocation = event.target.value;
    this.setState((prevState) => {
      let prevLocations = [...prevState.preferredLocations];
      if (prevLocations.includes(selectedLocation)) {
        // Deselect the location if it was previously selected
        return {
          preferredLocations: prevLocations.filter((loc) => loc !== selectedLocation),
        };
      } else {
        // Select the location if it was not previously selected
        return {
          preferredLocations: [...prevLocations, selectedLocation],
        };
      }
    });
  }
  setSuccessMessage = (message) => {
    this.setState({ successMessage: message, errorMessage: '' });
  };

  setErrorMessage = (message) => {
    this.setState({ successMessage: '', errorMessage: message });
  };


  handleSubmit = () => {
    this.props.side();
    if (this.state.level && this.state.areaOfInterest && this.state.preferredLocations.length > 0) {
      this.setSuccessMessage('Quiz submitted successfully!');
    } else {
      this.setErrorMessage('Please answer all questions.');
    }
  };

  render(){
  return (
    <div>
      <h1>Job Preference Quiz</h1>
      <div>
        <p>1. What level of job are you looking for?</p>
        <label>
          <input type="radio" value="Intern" checked={this.state.level === 'Intern'} onChange={this.handleLevelChange} />
          Intern
        </label>
        <label>
          <input type="radio" value="Full-time" checked={this.state.level === 'Full-time'} onChange={this.handleLevelChange} />
          Full-time (entry level/new grad)
        </label>
        <label>
          <input type="radio" value="Senior" checked={this.state.level === 'Senior'} onChange={this.handleLevelChange} />
          Senior
        </label>
        <label>
          <input type="radio" value="Co-op" checked={this.state.level === 'Co-op'} onChange={this.handleLevelChange} />
          Co-op
        </label>
      </div>

      <div>
        <p>2. What is your area of interest?</p>
        <label>
          <input type="radio" value="Software" checked={this.state.areaOfInterest === 'Software'} onChange={this.handleAreaOfInterestChange} />
          Software
        </label>
        <label>
          <input type="radio" value="Hardware" checked={this.state.areaOfInterest === 'Hardware'} onChange={this.handleAreaOfInterestChange} />
          Hardware
        </label>
        <label>
          <input type="radio" value="Data Science/ML/AI" checked={this.state.areaOfInterest === 'Data Science/ML/AI'} onChange={this.handleAreaOfInterestChange} />
          Data Science/ML/AI
        </label>
        <label>
          <input type="radio" value="Other" checked={this.state.areaOfInterest === 'Other'} onChange={this.handleAreaOfInterestChange} />
          Other
        </label>
      </div>

      <div>
        <p>3. Which is your preferred location? (Can select more than one)</p>
        {this.state.locations.map((location) => (
          <label key={location}>
            <input
              type="checkbox"
              value={location}
              checked={this.state.preferredLocations.includes(location)}
              onChange={this.handleLocationChange}
            />
            {location}
          </label>
        ))}
      </div>
      <div style={{ marginTop: "2rem", marginleft: "1rem", marginRight: "1rem", alignItems: 'center'}}>
      <button onClick={this.handleSubmit}>Submit</button>
      </div>
      {this.successMessage && <p style={{ color: 'green' }}>{this.successMessage}</p>}
      {this.errorMessage && <p style={{ color: 'red' }}>{this.errorMessage}</p>}
    </div>
  );
  }

}