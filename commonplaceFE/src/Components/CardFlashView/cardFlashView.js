import React from 'react'; 
import './cardFlashView.css';
import IndividualCard from '../IndividualCard/individualCard';
import LoadingSpinner from '../LoadingSpinner/loadingSpinner';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { IconContext } from 'react-icons';

export default class CardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      deleting: false
    }
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
    const {currentCard} = this.state;
    const { cards } = this.props;
    console.log(cards.length); 
    console.log(currentCard);
    if (currentCard == cards.length && currentCard != 0) {
      let curr = currentCard; 
      curr -= 1; 
      this.setState({ currentCard: curr, deleting: false  })
    } else {
      this.setState({ deleting: false  })
    }
    
  }

  onFailure = () => {
    console.log("error deleting card from flash view");
    this.incrementCard();
  }

  deleteFromFlashView = (cardId) => {
    const { onDelete } = this.props
    this.setState({ deleting: true })
    setTimeout(() => {
      onDelete(cardId).then(this.onSuccess, this.onFailure)
    }, 500)
  }

  render() {
    const { cards, onEdit } = this.props;
    const { currentCard, deleting } = this.state; 
    return (
      <div className="flash-view-container">
        <div className="flash-card-container">
          {!deleting && cards.length > 0 && [
            <div className="flash-card-header" key="flash-card-header">
              <IconContext.Provider value={{ style: {fontSize: '20px', verticalAlign: "middle"}}}>
              <button 
                disabled={deleting} 
                onClick={() => this.decrementCard()}
                className="flash-card-header-button"
              ><BiChevronLeft/></button>
            </IconContext.Provider>
             {(currentCard + 1) + "/" + cards.length}
             <IconContext.Provider value={{ style: {fontSize: '20px', verticalAlign: "middle"}}}>
              <button 
                disabled={deleting} 
                onClick={() => this.incrementCard()}
                className="flash-card-header-button"
              ><BiChevronRight/></button>
            </IconContext.Provider>
            </div>,
            <div className="flash-card-body" key="flash-card-body">
              <IndividualCard
                card={cards[currentCard]}
                onEdit={onEdit}
                onDelete={this.deleteFromFlashView}
                largerCard
                isFlashCard
              >
              </IndividualCard>
            </div>
          ]}
          {deleting && (
            <LoadingSpinner></LoadingSpinner>
          )}
          {cards.length == 0 && (
            <p>No Cards In View</p>
          )}
        </div>
      </div>
    )
  }

}