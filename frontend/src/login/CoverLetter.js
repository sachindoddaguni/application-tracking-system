import React, { Component } from 'react';

class CoverLetterGenerator extends Component {
  constructor(props) {
    super(props);

    // Initial state to store user input
    this.state = {
      companyName: '',
      jobTitle: '',
      userSkills: '',
      userExperience: '',
    };
  }

  // Function to handle changes in form input
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // Function to generate cover letter based on user input
  generateCoverLetter = () => {
    // Customize this template based on your needs
    const coverLetterTemplate = `
    [Your Name]
    [Your Address]
    [City, State, ZIP Code]
    [Your Email Address]
    [Your Phone Number]
    
    [Date]
    
    [Employer's Name]
    [Company Name]
    [Company Address]
    [City, State, ZIP Code]
    
    Dear [Employer's Name],
    
    I am writing to express my interest in the [Job Title] position at [Company Name], as advertised on [where you found the job posting]. With a strong background in [Your Skills] and [Your Experience], I believe I am well-suited for this role.
    
    [Customize the content based on user input]
    
    Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with the needs of [Company Name].
    
    Sincerely,
    [Your Name]
    `;

    // Replace placeholders with user input
    const customizedCoverLetter = coverLetterTemplate
      .replace('[Your Name]', '[User Name]')
      .replace('[Job Title]', this.state.jobTitle)
      .replace('[Company Name]', this.state.companyName)
      .replace('[Your Skills]', this.state.userSkills)
      .replace('[Your Experience]', this.state.userExperience);

    // Create a Blob with the cover letter content
    const blob = new Blob([customizedCoverLetter], { type: 'text/plain' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'cover_letter.txt';

    // Append the link to the DOM and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the link from the DOM
    document.body.removeChild(downloadLink);
  };

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Cover Letter Generator</h2>
        <form>
          <label style={styles.label}>
            Company Name:
            <input
              type="text"
              name="companyName"
              value={this.state.companyName}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Job Title:
            <input
              type="text"
              name="jobTitle"
              value={this.state.jobTitle}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Your Skills:
            <textarea
              name="userSkills"
              value={this.state.userSkills}
              onChange={this.handleInputChange}
              style={styles.textarea}
            />
          </label>
          <br />
          <label style={styles.label}>
            Your Experience:
            <textarea
              name="userExperience"
              value={this.state.userExperience}
              onChange={this.handleInputChange}
              style={styles.textarea}
            />
          </label>
          <br />
          <button type="button" onClick={this.generateCoverLetter} style={styles.button}>
            Generate & Download Cover Letter
          </button>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#fde4e4', // Pale pink background color
    color: '#333',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#3498db',
    marginBottom: 20,
  },
  label: {
    display: 'block',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    border: '1px solid #ddd',
    borderRadius: 4,
  },
  textarea: {
    width: '100%',
    height: 100,
    padding: 10,
    marginBottom: 15,
    border: '1px solid #ddd',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default CoverLetterGenerator;
