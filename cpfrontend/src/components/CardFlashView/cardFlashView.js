import React from 'react'; 
import './cardFlashView.css';
import IndividualCard from '../IndividualCard/individualCard';

export default class CardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0
    }
    console.log(props.cards);
  }

  incrementCard = () => {
    const { cards } = this.props; 
    let { currentCard } = this.state; 
    if (currentCard == cards.length - 1) {
      currentCard = 0;
    } else {
      currentCard += 1;
    }
    this.setState({ currentCard }); 
  }

  decrementCard = () => {
    const { cards } = this.props; 
    let { currentCard } = this.state; 
    if (currentCard == 0) {
      currentCard = cards.length - 1;
    } else {
      currentCard -= 1;
    }
    this.setState({ currentCard }); 
  }

  onSuccess = () => {
    console.log("success"); 
    const {currentCard} = this.state; 
    let updateCard = currentCard - 1; 
    this.setState({currentCard: updateCard});
  }

  onFailure = () => {
    console.log("error deleting card from flash view");
  }

  deleteFromFlashView = async (cardId) => {
    const { onDelete } = this.props
    onDelete(cardId).then(this.onSuccess, this.onFailure)
  }

  render() {
    const { cards, onEdit, onDelete } = this.props;
    const { currentCard } = this.state; 
    return (
      <div className="flash-view-container">
        <div className="flash-card-container">
          <div className="flash-card-header">
            {"Card " + (currentCard + 1) + "/" + cards.length}
          </div>
          <div className="flash-card-body">
            <IndividualCard
              card={cards[currentCard]}
              onEdit={onEdit}
              onDelete={this.deleteFromFlashView}
              largerCard
            >
            </IndividualCard>
          </div>
          <div className="flash-card-footer">
            <button onClick={() => this.decrementCard()}>Previous Card</button>
            <button onClick={() => this.incrementCard()}>Next Card</button>
          </div>
        </div>
      </div>
    )
  }

}