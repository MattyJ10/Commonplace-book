import React from 'react'; 
import './CardScreen.css';
import { connect } from "react-redux";
import { upsertCard, deleteCard, fetchCards } from '../../api/cardApi';
import { fetchBooks, addBook, deleteBook } from '../../api/bookApi';
import { fetchTopics, addTopic, deleteTopic } from '../../api/topicApi';
import AddOrEditCard from '../../Modals/AddOrEditCard/addOrEditCard';
import CardGridView from '../../Components/CardGridView/cardGridView';
import CardFlashView from '../../Components/CardFlashView/cardFlashView';
import LoadingSpinner from '../../Components/LoadingSpinner/loadingSpinner';
import ManageItems from '../../Components/ManageItems/manageItems'; 
import BookGridView from '../../Components/BookGridView/bookGridView';

class CardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: "Grid View",
      showAddCardModal: false,
      loading: true,
    }
  }

  componentDidMount() {
    const { fetchCards, fetchBooks, fetchTopics } = this.props; 
    let fetches = []; 
    let self = this;
    setTimeout(() => {
      fetches.push(fetchCards()); 
      fetches.push(fetchBooks());
      fetches.push(fetchTopics());
      Promise.all(fetches)
        .then(() => {
          self.setState({ loading: false }); 
        })
        .catch((err) => {
          self.setState({ loading: false });
        })
    }, 500);
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

  onEditItem = (type, item) => {
    console.log(type);
    console.log(item);
    console.log("Need to show edit modal for item!");
  }

  closeModal = () => {
    this.setState({ showAddCardModal: false })
  }

	render() {
    let { showComponent, showAddCardModal, editingCard, loading } = this.state;
    let { cards, deleteCard, upsertCard, addBook, deleteBook, books, addTopic, deleteTopic, topics } = this.props;
    return (
      <div className="home-container">
        <div className="subnav-container">
          <button 
            onClick={() => this.showModal()}
            className="main-button"
            disabled={loading}
          >Add Card</button>
          <button 
            onClick={() => this.onNavChange('Grid View')}
            className="main-button"
            disabled={loading}
          >Grid View</button>
          <button 
            onClick={() => this.onNavChange('Flash View')}
            className="main-button"
            disabled={loading}
          >Flash View</button>
          <button 
            onClick={() => this.onNavChange('Manage Books')}
            className="main-button"
            disabled={loading}
          >Manage Books</button>
          <button 
            onClick={() => this.onNavChange('Manage Topics')}
            className="main-button"
            disabled={loading}
          >Manage Topics</button>
        </div>
        {showComponent == "Grid View" && !loading && (
          <CardGridView
            cards={cards}
            onDelete={deleteCard}
            onEdit={this.showModal}
          ></CardGridView>
        )}
        {showComponent == "Flash View" && !loading && (
          <CardFlashView
            cards={cards}
            onDelete={deleteCard}
            onEdit={this.showModal}
          >
          </CardFlashView>
        )}
        {showComponent == "Manage Books" && !loading && (
          <ManageItems
            items={books}
            tableTitle="Books"
            mainField="displayTitle"
            deleteBook={deleteBook}
            handleEdit={this.onEditItem}
            type="Book"
          ></ManageItems>
          // <BookGridView
          //   books={books}
          // ></BookGridView>
        )}
        {showComponent == "Manage Topics" && !loading && (
          <ManageItems
            items={topics}
            tableTitle="Topics"
            mainField="displayTopic"
            deleteTopic={deleteTopic}
            handleEdit={this.onEditItem}
            type="Topic"
          ></ManageItems>
        )}
        {loading && (
          <LoadingSpinner></LoadingSpinner>
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
    topics: state.topicReducer.topics
  }
  return obj; 
}

export default connect(mapStateToProps, {
  deleteCard, 
  fetchCards, 
  upsertCard, 
  fetchBooks, 
  addBook,
  deleteBook,
  fetchTopics,
  addTopic,
  deleteTopic,
})
(CardScreen)