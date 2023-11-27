import 'bootstrap/dist/css/bootstrap.min.css'
import './static/App.css';

import React from 'react';
import Sidebar from './sidebar/Sidebar'
import ApplicationPage from './application/ApplicationPage'
import SearchPage from './search/SearchPage'
import LoginPage from './login/LoginPage'
import ManageResumePage from './resume/ManageResumePage'
import BuildResumePage from './resume/BuildResumePage'
import CreateUserProfilePage from './login/CreateProfilePage';
import UserProfilePage from './sidebar/UserProfilePage';
import MoreInfoPage from './login/MoreInfoPage';
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
      'UserProfileCreatePage': <CreateUserProfilePage/>,
      'UserProfilePage': <UserProfilePage/>,
      'MoreInfoPage': <MoreInfoPage/>,
      'QuizPage': <QuizPage/>
    }
    this.state ={
      currentPage: <CreateUserProfilePage/>,
      mapRouter: mapRouter,
      sidebar: false,
      display: "My applications",
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
    this.setState({
      currPageName: "QuizPage",
      display: "Let's take a quick quiz"
    })
  }

  switchToProfile=()=>{
    this.setState({
      currPageName: "CreateProfilePage",
      display: "We would love to get to know you better"
    })
  }

  switchToMoreInfo=()=>{
    this.setState({
      currPageName: "MoreInfoPage",
      display: "Where do you aspire to be"
    })
  }

  switchtoProfilePage=()=>{
    this.setState({
      currPageName: "UserProfilePage",
      display: "Review the data entered"
  })
  }

  switchtoLogin=()=>{
    this.setState({
      currPageName: "LoginPage",
      display: "My applications"
  })
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
          <h1 className="text-center" style={{padding: 0.4 + 'em'}}>{this.state.display}</h1>
          <div className="">
            {/* <span className="btn-icon ">
              <button className="btn btn-danger btn-icon"><i className="fas fa-plus"></i>&nbsp;New</button>
            </span> */}
          </div>
          <div style={{display: this.state.currPageName === 'LoginPage'? "block" : "none"}}>
            <LoginPage  side={this.sidebarHandler} signupSw = {this.switchToQuiz}/>
          </div>
          <div style={{display: this.state.currPageName === 'QuizPage'? "block" : "none"}}>
            <QuizPage side={this.switchToProfile}/>
          </div>
          <div style={{display: this.state.currPageName === 'CreateProfilePage'? "block" : "none"}}>
            <CreateUserProfilePage side={this.switchToMoreInfo}/>
          </div>
          <div style={{display: this.state.currPageName === 'MoreInfoPage'? "block" : "none"}}>
            <MoreInfoPage side={this.switchtoProfilePage}/>
          </div>
          <div style={{display: this.state.currPageName === 'UserProfilePage'? "block" : "none"}}>
            <UserProfilePage side={this.switchtoLogin}/>
          </div>
          
        </div>
      </div>
    </div>
    )
    }
    return app;
  }
}

