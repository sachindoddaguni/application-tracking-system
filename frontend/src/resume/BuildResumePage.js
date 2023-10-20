import React, { Component } from 'react';
import styles from './styles.module.css';

class BuildResumePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      email: '',
      linkedin: '',
      phone: '',
      education: [],
      skills: [],
      workExperience: [],
      projects: [],
      extracurricularActivities: [],
      downloadLink: null,
      buttonVisible: false,
      linkClicked: false,
      formSubmitted: false,
    };
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleInputChangeEducation = (index, field, value) => {
    this.setState((prevState) => {
      const educationCopy = [...prevState.education];
      const entryCopy = { ...educationCopy[index] };
  
      // Update the specific field in the entry copy
      entryCopy[field] = value;
  
      // Update the entry in the education copy
      educationCopy[index] = entryCopy;
  
      return { education: educationCopy };
    });
  };

    handleInputChangeSkills = (index, field, value) => {
    this.setState((prevState) => {
      const skillsCopy = [...prevState.skills];
      const entryCopy = { ...skillsCopy[index] };

      // Update the specific field in the entry copy
      entryCopy[field] = value;

      // Update the entry in the skills copy
      skillsCopy[index] = entryCopy;

      return { skills: skillsCopy };
    });
  };

    handleInputChangeWorkExp = (index, field, value) => {
    this.setState((prevState) => {
      const workexpCopy = [...prevState.workExperience];
      const entryCopy = { ...workexpCopy[index] };

      // Update the specific field in the entry copy
      entryCopy[field] = value;

      // Update the entry in the skills copy
      workexpCopy[index] = entryCopy;

      return { workExperience: workexpCopy };
    });
  };

        handleInputChangeProjects = (index, field, value) => {
    this.setState((prevState) => {
      const projectsCopy = [...prevState.projects];
      const entryCopy = { ...projectsCopy[index] };

      // Update the specific field in the entry copy
      entryCopy[field] = value;

      // Update the entry in the skills copy
      projectsCopy[index] = entryCopy;

      return { projects: projectsCopy };
    });
  };



  handleAddSection = (section) => {
    const newEntry = {
      // s: '',
      // l: '',
      // skills: '',
      // level: '',
      // Add default values for other fields as needed
    };

    this.setState((prevState) => ({
      [section]: [...prevState[section], newEntry],
    }));
  };

  handleRemoveSection = (section, index) => {
    this.setState((prevState) => {
      const sectionData = [...prevState[section]];
      sectionData.splice(index, 1);
      return { [section]: sectionData };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();


    // Prepare the data to be sent to the server
    const formData = {
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      linkedin: this.state.linkedin,
      phone: this.state.phone,
      education: this.state.education,
      skills: this.state.skills,
      workExperience: this.state.workExperience,
      projects: this.state.projects,
      extracurricularActivities: this.state.extracurricularActivities,
    };

    try {
      const response = await fetch('http://localhost:5000/resumebuilder', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok && response.headers.get('Content-Type') === 'application/msword') {
        // Convert the response to a Blob
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        this.setState({ downloadLink: url,          buttonVisible: true,
          formSubmitted: true,           linkClicked: false, });

      } else {
        console.error('Failed to submit form:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

    linkClickHandler = () => {
    this.setState({ linkClicked: true });
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form style={{ textAlign: 'left'}} onSubmit={this.handleSubmit} className={styles['download-form']}>
        {!this.state.linkClicked && this.state.downloadLink && (
          <a
            href={this.state.downloadLink}
            download="Resume.docx"
            onClick={this.linkClickHandler}
          >
            Click here to download the Document
          </a>
        )}
          <div style={{ marginBottom: '10px'}}>
            <div style={{ marginBottom: '10px', marginTop: '10px' }}>
              <h2>__________________Build Your Resume__________________</h2></div>
            <h3 style={{ marginBottom: '10px', marginTop: '50px' }}>Personal Information:</h3>
          </div>
          <div style={{ marginBottom: '50px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={this.state.name}
                onChange={(e) => this.handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={this.state.address}
                onChange={(e) => this.handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={(e) => this.handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="linkedin">LinkedIn:</label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={this.state.linkedin}
                onChange={(e) => this.handleInputChange('linkedin', e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={this.state.phone}
                onChange={(e) => this.handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          <h3>Education:</h3>
          <div style={{ marginBottom: '10px' }}>
            <button
              type="button"
              style={{ marginBottom: '10px', width: '150px' }}
              onClick={() => this.handleAddSection('education')}
            >
              Add Education
            </button>
          </div>

          {this.state.education.map((entry, index) => (
            <div className="row" style={{ marginBottom: '10px' }} key={index}>
              <label>University:</label>
              <input
                type="text"
                value={entry.university || ''}
                onChange={(e) => this.handleInputChangeEducation(index, 'university', e.target.value)}
              />

              <label>Degree:</label>
              <input
                type="text"
                value={entry.degree || ''}
                onChange={(e) => this.handleInputChangeEducation(index, 'degree', e.target.value)}
              />

              <button
                type="button"
                style={{ marginLeft: '10px', width: '100px' }}
                onClick={() => this.handleRemoveSection('education', index)}
              >
                Remove
              </button>
            </div>
          ))}



          <h3>Skills:</h3>
          <div style={{ marginBottom: '10px' }}>
            <button
              type="button"
              style={{ marginBottom: '10px', width: '150px' }}
              onClick={() => this.handleAddSection('skills')}
            >
              Add Skills
            </button>
          </div>

          {this.state.skills.map((entry, index) => (
            <div className="row" style={{ marginBottom: '10px' }} key={index}>
              <label>Skill:</label>
              <input
                type="text"
                value={entry.skills || ''}
                onChange={(e) => this.handleInputChangeSkills(index, 'skills', e.target.value)}
              />

              <label>Level:</label>
              <input
                type="text"
                value={entry.level || ''}
                onChange={(e) => this.handleInputChangeSkills(index, 'level', e.target.value)}
              />

              <button
                type="button"
                style={{ marginLeft: '10px', width: '100px' }}
                onClick={() => this.handleRemoveSection('skills', index)}
              >
                Remove
              </button>
            </div>
          ))}


          <h3>Work Experience:</h3>
          <div style={{ marginBottom: '10px' }}>
            <button
              type="button"
              style={{ marginBottom: '10px', width: '150px' }}
              onClick={() => this.handleAddSection('workExperience')}
            >
              Add Additional
            </button>
          </div>

          {this.state.workExperience.map((entry, index) => (
            <div className="row" style={{ marginBottom: '10px' }} key={index}>
              <label>Company:</label>
              <input
                type="text"
                value={entry.company || ''}
                onChange={(e) => this.handleInputChangeWorkExp(index, 'company', e.target.value)}
              />

              <label>Description:</label>
              <input
                type="text"
                value={entry.descriptionc || ''}
                onChange={(e) => this.handleInputChangeWorkExp(index, 'descriptionc', e.target.value)}
              />

              <button
                type="button"
                style={{ marginLeft: '10px', width: '100px' }}
                onClick={() => this.handleRemoveSection('workExperience', index)}
              >
                Remove
              </button>
            </div>
          ))}




          <h3>Projects:</h3>
          <div style={{ marginBottom: '10px' }}>
            <button
              type="button"
              style={{ marginBottom: '10px', width: '150px' }}
              onClick={() => this.handleAddSection('projects')}
            >
              Add Projects
            </button>
          </div>

          {this.state.projects.map((entry, index) => (
            <div className="row" style={{ marginBottom: '10px' }} key={index}>
              <label>Project Title:</label>
              <input
                type="text"
                value={entry.project_title || ''}
                onChange={(e) => this.handleInputChangeProjects(index, 'project_title', e.target.value)}
              />

              <label>Description:</label>
              <input
                type="text"
                value={entry.project_desc || ''}
                onChange={(e) => this.handleInputChangeProjects(index, 'project_desc', e.target.value)}
              />

              <button
                type="button"
                style={{ marginLeft: '10px', width: '100px' }}
                onClick={() => this.handleRemoveSection('projects', index)}
              >
                Remove
              </button>
            </div>
          ))}


          <button type="submit" style={{ width: '100px' }}>
            Submit
          </button>
        </form>
      </div>



    );
  }
}

export default BuildResumePage;
