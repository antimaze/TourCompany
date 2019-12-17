import React from "react";
import ReactDOM from "react-dom";
import Home from "../guest/Home.js";
import Tours from "../guest/Tours.js";
import About from "../guest/About.js";
import NotImplemented from "../guest/NotImplemented.js";

function NavigationBar(){
  return  ;
}

class CustomerNav extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showing : "home"
    };
  }

  changeShow(state){
      this.setState({
        showing: state
      });
  }

  logout(){
    this.props.handleLogout();
  }

  render(){

    let page;
    if(this.state.showing === "home"){
      page = <Home />;
    }
    else if(this.state.showing === "about"){
      page = <About />;
    }
    else if(this.state.showing === "tours"){
      page = <Tours />;
    }
    else{
      // If we have not implemented view that are clicked,,,
      // Then we simply show a message "Not implemented" using NotImplemented component...
      page = <NotImplemented state={this.state.showing} />;
    }

    return <div>
            <div className="navigation">
              <nav className="navigationBar">
                <div className="logo"><span> Wonders tour </span></div>
                <div className="menu">
                  <ul className="ulist">
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "tours")}>Tours</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "about")}>About us</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "home")}>Home</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.logout.bind(this)}>Logout</a></li>
                  </ul>
                </div>
              </nav>
            </div>
            {page}
          </div>
  }
}

export default CustomerNav;
