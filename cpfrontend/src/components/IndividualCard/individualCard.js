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
      containerClass += " larger-individual-card-container";
    }
    return (
      <div className={containerClass}>
        <div className="individual-card-header">
          <h1 className="individual-card-title">{card.book.displayTitle}</h1>
          <h2 className="individual-card-title">{card.topic.displayTopic}</h2>
        </div>
        <div className="individual-card-sub-header">
          <button className="main-button" onClick={() => onEdit(card)}>Edit</button>
          <button className="main-button" onClick={() => onDelete(card._id)}>Delete</button>
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
