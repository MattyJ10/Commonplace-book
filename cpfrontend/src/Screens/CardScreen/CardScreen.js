import React from 'react'; 
import './CardScreen.css';
import { connect } from "react-redux";
import { upsertCard, deleteCard, fetchCards } from '../../Redux/actions';
import { AddOrEditCard } from '../../Modals/AddOrEditCard/addOrEditCard';
import CardGridView from '../../Components/CardGridView/cardGridView';
import CardFlashView from '../../Components/CardFlashView/cardFlashView';


class CardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: "Grid View",
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
        <div className="subnav-container">
          <button onClick={() => this.showModal()}>Add Card</button>
          <button onClick={() => this.onNavChange('Grid View')}>Grid View</button>
          <button onClick={() => this.onNavChange('Flash View')}>Flash View</button>
        </div>
        {showComponent == "Grid View" && (
          <CardGridView
            cards={cards}
            onDelete={deleteCard}
            onEdit={this.showModal}
          ></CardGridView>
        )}
        {showComponent == "Flash View" && (
          <CardFlashView
            cards={cards}
            onDelete={deleteCard}
            onEdit={this.showModal}
          >
          </CardFlashView>
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