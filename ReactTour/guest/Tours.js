import React from "react";
// import OrganizedTours from "../tours.json";

class Tours extends React.Component{
  constructor(props){
      super(props);

      this.state = {
        PhysicalTours: [],
        VirtualTours: []
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
          PhysicalTours: PhysicalTours,
          VirtualTours: VirtualTours
        });
        console.log(this.state);
      })
      .catch(function(err){
        console.log("Error while fetching the data... ", err);
      });
  }

  render(){

    return <main className="main">
              <section className="section">
                <header className="header"><h1>Virtual Tours</h1></header>
                <table className="tourTable">
                  <thead key="tourHeader" className="tourTableHeader">
                    <tr>
                    <th><strong>Name</strong></th>
                    <th><strong>Date</strong></th>
                    </tr>
                  </thead>
                  <tbody className="tourTableBody">
                  {this.state.VirtualTours.map((key, i) => (
                    <tr key={i}>
                    <td>{key.name}</td>
                    <td>{key.date}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                <header className="header"><h1>Physical Tours</h1></header>
                <table className="tourTable">
                  <thead key="tourHeader" className="tourTableHeader">
                    <tr>
                    <th><strong>Name</strong></th>
                    <th><strong>Date</strong></th>
                    </tr>
                  </thead>
                  <tbody className="tourTableBody">
                  {this.state.PhysicalTours.map((key, i) => (
                    <tr key={i}>
                    <td>{key.name}</td>
                    <td>{key.date}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </section>
            </main>;
  }
}

export default Tours;
