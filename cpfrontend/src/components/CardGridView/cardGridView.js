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
    const { cards } = this.props;
    return (
      <div className="grid-view-container">
        {cards && cards.map((card, index) => {
          return <IndividualCard
            card={card}
          ></IndividualCard>
        })}
      </div>
    )
  }

}