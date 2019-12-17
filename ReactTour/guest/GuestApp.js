import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home.js";
import About from "./About.js";
import Login from "./Login.js";
import Tours from "./Tours.js";
import NotImplemented from "./NotImplemented.js";

class GuestApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {showing : "home"};
  }

  changeShow(state){
      this.setState({
        showing: state
      });
  }

  handleSuccessfulAuth(role, userInfo){
    this.props.handleLogin(role, userInfo);
  }

  render(){

    let page;
    if(this.state.showing === "home"){
      page = <Home />;
    }
    else if(this.state.showing === "about"){
      page = <About />;
    }
    else if(this.state.showing === "login"){
      page = <Login handleSuccessfulAuth={this.handleSuccessfulAuth.bind(this)}/>;
    }
    else if(this.state.showing === "tours"){
      page = <Tours />;
    }
    else{
      page = <NotImplemented state={this.state.showing} />;
    }

    return <div>
            <div className="navigation">
              <nav className="navigationBar">
                <div className="logo"><span> Wonders tour </span></div>
                <div className="menu">
                  <ul className="ulist">
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "tours")}>Comming Tour</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "login")}>Login</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "signup")}>Newsletter Signup</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "about")}>About us</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "home")}>Home</a></li>
                  </ul>
                </div>
              </nav>
            </div>;
            {page}
          </div>
  }
}

export default GuestApp;
