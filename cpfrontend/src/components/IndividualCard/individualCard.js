import React from 'react'; 
import './individualCard.css';

export default class IndividualCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { card } = this.props;
    return (
      <div className="individual-card-container">
        <div className="individual-card-header">
          <h1 className="individual-card-title">Book/Origin</h1>
          <h2 className="individual-card-title">Topic</h2>
        </div>
        <div className="individual-card-sub-header">
          <button className="individual-card-header-button">Edit</button>
          <button className="individual-card-header-button">Check Labels</button>
          <button className="individual-card-header-button">Delete</button>
        </div>
        <div className="individual-card-body-container">
          <div className="individual-card-body">
            <div className="individual-card-body-content">{card.body}</div>
          </div>
        </div>
      </div>
    )
  }

  

}
