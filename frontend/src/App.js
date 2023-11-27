import 'bootstrap/dist/css/bootstrap.min.css'
import './static/App.css';

import React from 'react';
import Sidebar from './sidebar/Sidebar'
import ApplicationPage from './application/ApplicationPage'
import SearchPage from './search/SearchPage'
import LoginPage from './login/LoginPage'
import ManageResumePage from './resume/ManageResumePage'
import BuildResumePage from './resume/BuildResumePage'
import QuizPage from './login/quiz';

export default class App extends React.Component {
  constructor(props){
    super(props)
    let mapRouter = {
      'SearchPage': <SearchPage/>,
      'ApplicationPage' : <ApplicationPage/>,
      'LoginPage': <LoginPage/>,
      'ManageResumePage': <ManageResumePage/>,
      'BuildResumePage': <BuildResumePage/>,
      'QuizPage': <QuizPage/>
    }
    this.state ={
      currentPage: <LoginPage/>,
      mapRouter: mapRouter,
      sidebar: false,
      currPageName : "LoginPage"
    }
    this.sidebarHandler = this.sidebarHandler.bind(this);
  };

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.sidebarHandler()
    }
  }

  sidebarHandler = () => {
    this.setState({
      currentPage: this.state.mapRouter['ApplicationPage'],
      sidebar: true
    })
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    this.setState({
      sidebar:false
    })
  }

  switchPage(pageName){
    this.setState({
      currentPage: this.state.mapRouter[pageName]
    })
  }

  switchToQuiz=()=>{
    this.setState({currPageName: "QuizPage"})
  }

  render() {
    var app;
    // console.log(this.state.sidebar)
    if(this.state.sidebar){
      app = (<div className="main-page">
        <Sidebar switchPage={this.switchPage.bind(this)}/>
        <div className="main">
          <div className="content">
            <div className="">
              <h1 className="text-center">My applications</h1>
              {/* <span className="btn-icon ">
                <button className="btn btn-danger btn-icon"><i className="fas fa-plus"></i>&nbsp;New</button>
              </span> */}
            </div>
            {this.state.currentPage}
            <button style={{position: 'absolute',
                         top: '2vh',
                         left:'90vw'}}
                    onClick={this.handleLogout}>Logout

            </button>
          </div>
        </div>
      </div>
      )
    }
    else{
      app = (<div className="main-page">
      <div className="main">
        <div className="content">
          <h1 className="text-center" style={{padding: 0.4 + 'em'}}>My applications</h1>
          <div className="">
            {/* <span className="btn-icon ">
              <button className="btn btn-danger btn-icon"><i className="fas fa-plus"></i>&nbsp;New</button>
            </span> */}
          </div>
          <div style={{display: this.state.currPageName === 'LoginPage'? "block" : "none"}}>
            <LoginPage  side={this.sidebarHandler} signupSw = {this.switchToQuiz}/>
          </div>
          <div style={{display: this.state.currPageName === 'QuizPage'? "block" : "none"}}>
            <QuizPage side={this.sidebarHandler}/>
          </div>
        </div>
      </div>
    </div>
    )
    }
    return app;
  }
}

