import React, { Component } from 'react'
import $ from 'jquery'
import '../static/resume.css'


export default class MoreInfoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            targetTitle: "",
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

    setTargetSalaryRange = (event) => {
        this.setState({ targetSalaryRange: event.target.value })
    }

    setWeeklyTarget = (val) => {
        this.setState({ weeklyTarget: val })
    }

    handleSubmit = () => {
        let finalJson = {
            targetTitle: this.state.targetTitle,
            targetDate: this.state.targetDate,
            targetSalaryRange: this.state.targetSalaryRange,
            weeklyTarget: this.state.weeklyTarget
        }
        this.props.side(finalJson)
    }

    render() {
        return (
            <div style={{ alignItems: "Center" }}>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                        Target Job Title:
                        <div style={{ marginleft: "1rem", marginRight: "1rem" }}>
                            <input
                                type="text"
                                value={this.state.targetTitle}
                                onChange={(e) => this.setTargetTitle(e.target.value)}
                            /></div>
                    </label>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                        Enter Target Date in MM/DD/YYYY:
                        <div style={{ marginleft: "1rem", marginRight: "1rem" }}>
                            <input
                                type="text"
                                value={this.state.targetDate}
                                onChange={(e) => this.setTargetDate(e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                        Enter Target Salary Range:
                        <label>
                            <input type="radio" value="$90,000-$110,000" checked={this.state.targetSalaryRange === '$90,000-$110,000'} onChange={this.setTargetSalaryRange} />
                            $90,000-$110,000
                        </label>
                        <label>
                            <input type="radio" value="$110,000-$130,000" checked={this.state.targetSalaryRange === '$110,000-$130,000'} onChange={this.setTargetSalaryRange} />
                            $110,000-$130,000
                        </label>
                        <label>
                            <input type="radio" value="$130,000-$150,000" checked={this.state.targetSalaryRange === '$130,000-$150,000'} onChange={this.setTargetSalaryRange} />
                            $130,000-$150,000
                        </label>
                        <label>
                            <input type="radio" value="$150,000-$200,000" checked={this.state.targetSalaryRange === '150,000-$200,000'} onChange={this.setTargetSalaryRange} />
                            $150,000-$200,000
                        </label>
                    </label>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                        Enter Weekly Target:
                        <div style={{ marginleft: "1rem", marginRight: "1rem" }}>
                            <input
                                type="text"
                                value={this.state.weeklyTarget}
                                onChange={(e) => this.setWeeklyTarget(e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div style={{ marginTop: "2rem", marginleft: "1rem", marginRight: "1rem", alignItems: 'center' }}>
                    <button type="button" onClick={this.handleSubmit}>
                        Review your details
                    </button>
                </div>
            </div>
        )
    }
}

