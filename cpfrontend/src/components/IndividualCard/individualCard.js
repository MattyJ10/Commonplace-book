import React from 'react'; 
import './individualCard.css';

export default class IndividualCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    const { card, onDelete, onEdit, largerCard } = this.props;
    let containerClass = "individual-card-container";
    if (largerCard) {
      containerClass += " larger";
    }
    return (
      <div className={containerClass}>
        <div className="individual-card-header">
          <h1 className="individual-card-title">{card.book}</h1>
          <h2 className="individual-card-title">{card.topic}</h2>
        </div>
        <div className="individual-card-sub-header">
          <button className="individual-card-header-button" onClick={() => onEdit(card)}>Edit</button>
          {/* <button className="individual-card-header-button">Check Labels</button> */}
          <button className="individual-card-header-button" onClick={() => onDelete(card._id)}>Delete</button>
        </div>
        <div className="individual-card-body-container">
          <div className="individual-card-body">
            {card && card.body && <div className="individual-card-body-content">{card.body}</div>}
          </div>
        </div>
      </div>
    )
  }

  

}
