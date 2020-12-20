import React from 'react'; 
import './cardGridView.css';
import IndividualCard from '../IndividualCard/individualCard';

export default class CardGridView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { cards, onEdit, onDelete } = this.props;
    return (
      <div>
        {cards && cards.length > 0 && (
          <div className="grid-view-container">
            {cards.map((card, index) => {
              return <IndividualCard
                card={card}
                onEdit={onEdit}
                onDelete={onDelete}
                key={card._id}
              ></IndividualCard>
            })}
          </div>
        )}
        {cards && cards.length == 0 && (
          <p style={{textAlign: 'center'}}>No Cards In View</p>
        )}
      </div>
    )
  }

}