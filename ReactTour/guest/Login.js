import React from "react";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.HandleEmailChange = this.HandleEmailChange.bind(this);
    this.HandlePasswordChange = this.HandlePasswordChange.bind(this);
  }

  DoLogin(){
    fetch('/login', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "email": this.state.email,
        "password" : this.state.password
      })
    })
    .then((response) => {
      console.log("Response : ", response);
      if(response.status !== 200){
        throw response.error;
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data", data);
      console.log(data["role"] + "  " + data.role);
      this.props.handleSuccessfulAuth(data["role"], {
        email: data["email"],
        firstName: data["firstName"],
        lastName: data["lastName"]
      });
    })
    .catch(function(error){
      console.log("Error while logging in : ", error);
    });


    // if("admin@email.org" === this.state.email){
    //   this.props.handleSuccessfulAuth("admin", {name: "savan_admin", netId:"kr6986"});
    // }
    // else if("cust@email.org" === this.state.email){
    //   this.props.handleSuccessfulAuth("customer", {name: "savan_customer", netId:"kr6986"});
    // }
    // else{
    //   this.props.handleSuccessfulAuth("guest", {});
    // }
  }

  HandleEmailChange(event){
    this.setState({
      email: event.target.value
    });
  }

  HandlePasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }

  render(){
    return (
          <main className="main">
            <header className="header">
              <h1>Login</h1>
              <div className="grid-container">
                <div className="grid-item rightAlign">Email </div>
                <div className="grid-item leftAlign"><input id="email" className="textinputlength" type="text" onChange={this.HandleEmailChange} /></div>
                <div className="grid-item rightAlign">Password </div>
                <div className="grid-item leftAlign"><input id="password" className="textinputlength" type="password" onChange={this.HandlePasswordChange} /></div>
                <div className="grid-item rightAlign"><button id="signup" className="signupbutton" onClick={this.DoLogin.bind(this)}>Login</button></div>
              </div>
            </header>
            <section className="section">
            </section>
          </main>
        );
  }
}

export default Login;
