import React from 'react'; 
import './CardScreen.css';
import { connect } from "react-redux";
import { upsertCard, deleteCard, fetchCards } from '../../Redux/actions/cardActions';
import { fetchBooks, addBook } from '../../Redux/actions/bookActions';
import { fetchTopics, addTopic } from '../../Redux/actions/topicActions';
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
    this.props.fetchBooks();
    this.props.fetchTopics();
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
    let { cards, deleteCard, upsertCard, addBook, books, addTopic, topics } = this.props;
    return (
      <div className="home-container">
        <div className="subnav-container">
          <button 
            onClick={() => this.showModal()}
            className="main-button"
          >Add Card</button>
          <button 
            onClick={() => this.onNavChange('Grid View')}
            className="main-button"
          >Grid View</button>
          <button 
            onClick={() => this.onNavChange('Flash View')}
            className="main-button"
          >Flash View</button>
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
            books={books}
            addBook={addBook}
            topics={topics}
            addTopic={addTopic}
          ></AddOrEditCard>
        )}
      </div>
      
    )
	}
}

const mapStateToProps = state => {
  let obj = {
    cards: state.cardReducer.cards,
    books: state.bookReducer.books,
    topics: state.topicReducer.topics,
    error: state.errorReducer.error
  }
  return obj; 
}

export default connect(mapStateToProps, {
  deleteCard, 
  fetchCards, 
  upsertCard, 
  fetchBooks, 
  addBook,
  fetchTopics,
  addTopic
})
(CardScreen); 