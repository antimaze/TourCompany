import React from 'react';
import ReactDom from 'react-dom';
import {Component} from 'react';
import OrganizedTours from "../tours.json";
import TourTable from "./TourTable.js";

class AdminTour extends Component{
  constructor(props){
    super(props);
    this.state = {
      showTour : "hide",
      addDate:"",
      addName:"",
      addType:"virtual",
      tours: {
        phyTours: [],
        virtTour: []
      }
    };
  }

  componentDidMount() {
    fetch('http://localhost:1234/tours')
      .then(response => response.json())
      .then((data) => {
        var PhysicalTours = [];
        var VirtualTours = [];
        data.map((tour, i) => {
          console.log(tour);
          if(tour.tourType == "virtual"){
            VirtualTours.push(tour);
          }
          else if(tour.tourType == "physical"){
            PhysicalTours.push(tour);
          }
        });
        this.setState({
          tours: {
            phyTours: PhysicalTours,
            virtTour: VirtualTours
          }
        });
        console.log(this.state);
      })
      .catch(function(err){
        console.log("Error while fetching the data... ", err);
      });
  }

  ShowHideTourForm(){
    if(this.state.showTour === "hide"){
      this.setState({showTour: "show"});
    }
    else{
      this.setState({showTour: "hide"});
    }
  }

  HandleChange(type, event){
    console.log()
    if(type === "select"){
      this.setState({
        addType: event.target.value
      });
    }
    else if(type === "name"){
      this.setState({
        addName: event.target.value
      });
    }
    else if(type === "date"){
      this.setState({
        addDate: event.target.value
      });
    }
  }

  AddTour(){
    fetch("/tours", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
        name: this.state.addName,
        date: this.state.addDate,
        tourType: this.state.addType
      })
    })
    .then((response) => {
      if(response.status != 200){
        throw response.error;
      }
      return response.json();
    })
    .then((data) => {
      // If you use function(data) then it wont bind this... and "this" will be undefined...
      // So,,, Always use (data) => {} ...

      console.log(data);
      if(data["tourType"] === "virtual"){
        this.setState({
          tours: {
            virtTour: this.state.tours.virtTour.concat((data)),
            phyTours: this.state.tours.phyTours
          }
        });
      }
      else if(data["tourType"] === "physical"){
        this.setState({
          tours: {
            virtTour: this.state.tours.virtTour,
            phyTours: this.state.tours.phyTours.concat((data))
          }
        });
      }
    })
    .catch((error) => {
      console.log("Error while adding tour...", error);
    })
  }

  DeleteTour(type, index){
    let virtTour = this.state.tours.virtTour;
    let phyTours = this.state.tours.phyTours;
    let deleteTour;
    if(type === "virtual"){
      deleteTour = virtTour[index];
    }
    else if(type === "physical"){
      deleteTour = phyTours[index];
    }

    fetch('/tours/' + deleteTour._id, {
      method: "DELETE"
    })
    .then((response) => {
      console.log(response);
      if(response.status != 200){
        throw response.error;
      }
    })
    .then((data) => {
      if(type === "virtual"){
        virtTour.splice(index, 1);
      }
      else if(type === "physical"){
        phyTours.splice(index, 1);
      }

      this.setState({
        tours: {
          virtTour: virtTour,
          phyTours: phyTours
        }
      });
    })
    .catch((error) => {
      console.log("Error while deleting tour : ", error);
    })
  }

  render(){

    let form;
    if(this.state.showTour === "show"){
      form = <div className="grid-container">
                <div className="grid-item rightAlign">Type </div>
                <div className="grid-item leftAlign">
                  <select onChange={this.HandleChange.bind(this, "select")}>
                    <option value="virtual"  value="virtual" >Virtual</option>
                    <option value="physical">Physical</option>
                  </select>
                </div>
                <div className="grid-item rightAlign">Name </div>
                <div className="grid-item leftAlign"><input id="password" className="textinputlength" type="text" onChange={this.HandleChange.bind(this, "name")} /></div>
                <div className="grid-item rightAlign">Date(s) </div>
                <div className="grid-item leftAlign"><input id="password" className="textinputlength" type="text" onChange={this.HandleChange.bind(this, "date")} /></div>
                <div className="grid-item rightAlign"><button id="signup" className="signupbutton" onClick={this.AddTour.bind(this)}>Add</button></div>
              </div>;
    }
    else{
      form = "";
    }

    return <main className="main">
              <section className="section">
                <header className="header"><h1>Tour Management</h1></header>
                <div className="dropDownAddTour" onClick={this.ShowHideTourForm.bind(this)}>Add Tour</div>
                {form}
                <header className="header"><h1>Virtual Tours</h1></header>
                <TourTable tours={this.state.tours.virtTour} tourType="virtual" DeleteTour={this.DeleteTour.bind(this)} />
                <header className="header"><h1>Physical Tours</h1></header>
                <TourTable tours={this.state.tours.phyTours} tourType="physical" DeleteTour={this.DeleteTour.bind(this)} />
              </section>
            </main>;
  }
}

export default AdminTour;
