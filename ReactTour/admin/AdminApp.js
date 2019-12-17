import React from "react";
import ReactDOM from "react-dom";
import Home from "../guest/Home.js";
import Customers from "./ManageCustomers.js";
import About from "../guest/About.js";
import AdminTours from "./AdminTour.js"
import NotImplemented from "../guest/NotImplemented.js";

class AdminNav extends React.Component{
  constructor(props){
    super(props);
    this.state = {showing : "home"};
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
      page = <AdminTours />
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
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "tours")}>Tour Management</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "customers")}>Customer Management</a></li>
                    <li className="listItem"><a className="anchor" onClick={this.changeShow.bind(this, "about")}>About Us</a></li>
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

export default AdminNav;
