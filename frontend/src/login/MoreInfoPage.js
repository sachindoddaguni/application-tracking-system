import React, { Component } from 'react'
import $ from 'jquery'
import '../static/resume.css'


export default class MoreInfoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            targetTitle : "",
            targetDate: "",
            targetSalaryRange: "",
            weeklyTarget: ""
        }
    }


    componentDidMount() {
        // fetch the data only after this component is mounted
    }

    setTargetTitle = (val) => {
        this.setState({ targetTitle: val })
    }

    setTargetDate = (val) => {
        this.setState({ targetDate: val })
    }

    setTargetSalaryRange = (val) => {
        this.setState({ targetSalaryRange: val })
    }

    setWeeklyTarget = (val) => {
        this.setState({ weeklyTarget: val })
    }

    handleSubmit = () => {

    }

    render() {
        return (
            <div style={{alignItems:"Center"}}>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                    Target Job Title:
                        <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                        <input
                            type="text"
                            value={this.state.achievements}
                            onChange={(e) => this.setTargetTitle(e.target.value)}
                        /></div>
                    </label>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                    Enter Target Date in MM/DD/YYYY:
                        <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                        <input
                            type="text"
                            value={this.state.achievements}
                            onChange={(e) => this.setTargetDate(e.target.value)}
                        />
                        </div>
                    </label>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                    Enter Target Salary Range:
                        <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                        <input
                            type="text"
                            value={this.state.achievements}
                            onChange={(e) => this.setTargetSalaryRange(e.target.value)}
                        />
                        </div>
                    </label>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                    Enter Weekly Target:
                        <div  style={{ marginleft: "1rem", marginRight: "1rem" }}>
                        <input
                            type="text"
                            value={this.state.achievements}
                            onChange={(e) => this.setWeeklyTarget(e.target.value)}
                        />
                        </div>
                    </label>
                </div>
            </div>
        )
    }
}

