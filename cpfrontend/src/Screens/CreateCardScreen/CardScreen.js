import React from 'react'; 
import './CardScreen.css';
import { connect } from "react-redux";
import { upsertCard, deleteCard, fetchCards } from '../../Redux/actions';
import { ListCards } from '../../Components/ListCards/listCards';
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
    let { cards, deleteCard, upsertCard } = this.props;
    return (
      <div className="container">
        <div style={{textAlign: "center", padding: "20px"}}>
          <button onClick={() => this.showModal()}>Add Card</button>
        </div>
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
            addCard={upsertCard}
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

export default connect(mapStateToProps, {deleteCard, fetchCards, upsertCard} )(CardScreen); 