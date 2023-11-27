import React, { Component } from 'react';

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: [
        { collegeName: 'Example College 1', degree: 'Bachelor', major: 'Computer Science', gpa: '3.8' },
        { collegeName: 'Example College 2', degree: 'Master', major: 'Data Science', gpa: '4.0' },
      ],
      workExperience: [
        'Software Developer at ABC Company',
        'Intern at XYZ Corporation',
      ],
      skills: 'React, JavaScript, HTML, CSS',
      achievements: 'Completed a major project on XYZ',
    };
  }

  renderEducation() {
    return this.state.education.map((edu, index) => (
      <div key={index}>
        <h3>Education {index + 1}</h3>
        <p>College Name: {edu.collegeName}</p>
        <p>Degree: {edu.degree}</p>
        <p>Major: {edu.major}</p>
        <p>GPA: {edu.gpa}</p>
      </div>
    ));
  }

  renderWorkExperience() {
    return this.state.workExperience.map((experience, index) => (
      <div key={index}>
        <h3>Work Experience {index + 1}</h3>
        <p>{experience}</p>
      </div>
    ));
  }

  handleSubmit = () => {
    this.props.side()
}

  render() {
    return (
      <div>
        <h1>User Profile</h1>

        <div>
          <h2>Education</h2>
          {this.renderEducation()}
        </div>

        <div>
          <h2>Work Experience</h2>
          {this.renderWorkExperience()}
        </div>

        <div>
          <h2>Skills</h2>
          <p>{this.state.skills}</p>
        </div>

        <div>
          <h2>Achievements</h2>
          <p>{this.state.achievements}</p>
        </div>
        <div>
                <button type="button" onClick={this.handleSubmit}>
                                    Login Page
                                </button>
                </div>
      </div>
      
    );
  }
}

export default UserProfilePage;
