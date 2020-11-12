import React from 'react'; 
import './CardScreen.css';
import { connect } from "react-redux";
import { addCard, deleteCard, fetchCards } from '../../Redux/actions';
import { AddCard } from '../../Components/AddCard/addCard';
import { ListCards } from '../../Components/ListCards/listCards';
import { ButtonNavBar } from '../../Components/ButtonNavBar/buttonNavBar';
import { AddOrEditCard } from '../../Modals/AddOrEditCard/addOrEditCard';


class CardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: "List Cards",
      showAddCardModal: false
    }
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  onNavChange = (destination) => {
    this.setState({ showComponent: destination })
  }

  showModal = (card = null) => {
    console.log(card);
    if (card) {
      this.setState({ showAddCardModal: true, editingCard: card })
    } else {
      this.setState({ showAddCardModal: true, editingCard: null })
    }
  }

  closeModal = () => {
    this.setState({ showAddCardModal: false })
  }

	render() {
    let { showComponent, showAddCardModal, editingCard } = this.state;
    let { cards, deleteCard, addCard } = this.props;
    return (
      <div className="container">
        {/* <ButtonNavBar
          labels={['Add Card', 'List Cards']}
          onNavChange={this.onNavChange}
        ></ButtonNavBar> */}
        <div style={{textAlign: "center", padding: "20px"}}>
          <button onClick={this.showModal}>Add Card</button>
        </div>
        
        {showComponent == "Add Card" && (
          <AddCard
            addCard={addCard}
          ></AddCard>
        )}
        {showComponent == "List Cards" && (
          <ListCards
            onDelete={deleteCard}
            cards={cards}
            onEdit={this.showModal}
          ></ListCards>
        )}
        {showAddCardModal && (
          <AddOrEditCard
            title="Add New Card"
            onClose={this.closeModal}
            card={editingCard}
            addCard={addCard}
          ></AddOrEditCard>
        )}
      </div>
      
    )
	}
}

const mapStateToProps = state => {
  let obj = {
    cards: state.cards
  }
  return obj; 
}

export default connect(mapStateToProps, {deleteCard, fetchCards, addCard} )(CardScreen); 