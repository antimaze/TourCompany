import React from 'react';
import ReactDom from 'react-dom';
import {Component} from 'react';

class TourTable extends Component{

  constructor(props){
    super(props);
  }

  DeleteTour(tourType, index){
    this.props.DeleteTour(tourType, index);
  }

  render(){

    let tours = this.props.tours;
    let tourType = this.props.tourType;
    let table = <table className="header tourTable">
                  <thead key="tourHeader" className="tourTableHeader">
                    <tr>
                    <th></th>
                    <th><strong>Name</strong></th>
                    <th><strong>Date</strong></th>
                    </tr>
                  </thead>
                  <tbody className="tourTableBody">
                {tours.map((key, i) => (
                  <tr key={i}>
                  <td><button onClick={this.DeleteTour.bind(this, tourType, i)}>delete</button></td>
                  <td>{key.name}</td>
                  <td>{key.date}</td>
                  </tr>
                ))}
                  </tbody>
                </table>;

    return <div>
            {table}
          </div>;
  }
}

export default TourTable;
