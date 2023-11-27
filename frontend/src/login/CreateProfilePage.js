import React, { Component } from 'react'
import $ from 'jquery'
import '../static/resume.css'


export default class CreateUserProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eds: [
                { collegeName: '', degree: '', major: '', gpa: '' },
            ],
            education: {},
            WorkEx: [
                { Company: '', Position: '' }
            ],
            achievements: "",
            skills: ""
        }

    }


    componentDidMount() {
        // fetch the data only after this component is mounted
    }

    addEducation = () => {
        let newEds = this.state.eds
        newEds.push({ collegeName: '', degree: '', major: '', gpa: '' })
        this.setState({ eds: newEds })
    };

    handleWorkEx = (index, field, value) => {
        let updatedWEx = [...this.state.WorkEx];
        updatedWEx[index][field] = value;
        this.setState({ WorkEx: updatedWEx })
    };

    addWorkEx = () => {
        let wex = this.state.WorkEx
        wex.push({ Company: '', Position: '' })
        this.setState({ WorkEx: wex })
    };

    handleEducationChange = (index, field, value) => {
        let updatedEducations = [...this.state.eds];
        updatedEducations[index][field] = value;
        this.setState({ eds: updatedEducations })
    };

    setAchievements = (val) => {
        this.setState({ achievements: val })
    }

    setSkills = (val) => {
        this.setState({ skills: val })
    }

    handleSubmit = () => {

    }

    render() {
        return (
            <div style={{alignItems:"Center"}}>
                <form onSubmit={this.handleSubmit}>
                    {this.state.eds.map((education, index) => (
                        <div key={index}>
                            <label style={{ marginleft: "1rem" }} >
                                College Name:
                                <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                                <input
                                    style={{ marginRight: "1rem" }}
                                    type="text"
                                    value={education.collegeName}
                                    onChange={(e) => this.handleEducationChange(index, 'collegeName', e.target.value)}
                                />
                                </div>
                            </label>
                            <br />
                            <label>
                                Degree:
                                <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                                <input
                                    type="text"
                                    value={education.degree}
                                    onChange={(e) => this.handleEducationChange(index, 'degree', e.target.value)}
                                />
                                </div>
                            </label>
                            <br />
                            <label>
                                Major:
                                <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                                <input
                                    type="text"
                                    value={education.major}
                                    onChange={(e) => this.handleEducationChange(index, 'major', e.target.value)}
                                /></div>
                            </label>
                            <br />
                            <label>
                                GPA:
                                <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                                <input
                                    type="text"
                                    value={education.gpa}
                                    onChange={(e) => this.handleEducationChange(index, 'gpa', e.target.value)}
                                /></div>
                            </label>
                            <br />
                            {index === this.state.eds.length - 1 && (
                                <button type="button" onClick={this.addEducation}>
                                    +
                                </button>
                            )}
                            <hr />
                        </div>
                    ))}
                </form>
                {this.state.WorkEx.map((work, index) => (
                    <div key={index} >
                        <label >
                            Company:
                            <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                            <input
                                style={{ marginRight: "1rem" }}
                                type="text"
                                value={work.collegeName}
                                onChange={(e) => this.handleWorkEx(index, 'collegeName', e.target.value)}
                            />
                            </div>
                        </label>
                        <br />
                        <label>
                            Position:
                            <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                            <input
                                type="text"
                                value={work.degree}
                                onChange={(e) => this.handleWorkEx(index, 'degree', e.target.value)}
                            /></div>
                        </label>
                        <br />

                        {index === this.state.WorkEx.length - 1 && (
                            <button type="button" onClick={this.addWorkEx}>
                                +
                            </button>
                        )}
                        <hr />
                    </div>
                ))}
                <div style={{ marginTop: "1rem" }}>
                    <label>
                        Skills:
                        <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                        <input
                            type="text"
                            value={this.state.achievements}
                            onChange={(e) => this.setSkills(e.target.value)}
                        /></div>
                    </label>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                        Achievements:
                        <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                        <input
                            type="text"
                            value={this.state.achievements}
                            onChange={(e) => this.setAchievements(e.target.value)}
                        />
                        </div>
                    </label>
                </div>
                <div>
                <button type="button" onClick={this.handleSubmit}>
                                    Proceed
                                </button>
                </div>
            </div>
        )
    }
}

