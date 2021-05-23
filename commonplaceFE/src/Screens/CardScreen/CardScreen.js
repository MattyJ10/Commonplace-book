import React from 'react'; 
import './CardScreen.css';
import { connect } from "react-redux";
import { deleteCard, upsertCard } from '../../api/cardApi';
import AddOrEditCard from '../../Modals/AddOrEditCard/addOrEditCard';
import CardGridView from '../../Components/CardGridView/cardGridView';
import CardFlashView from '../../Components/CardFlashView/cardFlashView';
import FilterModal from '../../Modals/FilterModal/filterModal';
class CardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: "Grid View",
      showAddCardModal: false,
      showFilterCardsModal: false,
      filteredCards: props.cards,
      filtersActive: false,
      bodyFilter: "",
      booksFilter: [],
      topicsFilter: []
    }
  }

  onNavChange = (destination) => {
    this.setState({ showComponent: destination })
  }

  showCardModal = (card = null) => {
    this.setState({ showAddCardModal: true, editingCard: card})
  }

  showFilterModal = () => {
    this.setState({ showFilterCardsModal: true })
  }

  closeModal = () => {
    this.setState({ showAddCardModal: false, showFilterCardsModal: false });
  }

  onSubmitFilter = (bodyFilter, booksFilter, topicsFilter) => {
    this.setState({ bodyFilter, booksFilter, topicsFilter, showFilterCardsModal: false, filterActive: true })
  }

  filterCards = (bodyContains = "", books = [], topics = []) => {
    const { cards } = this.props;
    if (bodyContains.length == 0 && books.length == 0 && topics.length == 0) {
      return cards;
    } else {
      let filteredCards = cards.filter((card) => {
        let bodyFilter = true;
        let bookFilter = true;
        let topicFilter = true;
        if (bodyContains.length > 0) {
          bodyFilter = card.body.includes(bodyContains); 
        }
        if (books.length > 0) {
          bookFilter = books.includes(card.book._id); 
        }
        if (topics.length > 0) {
          topicFilter = topics.includes(card.topic._id); 
        }
        return bodyFilter && bookFilter && topicFilter; 
      })
      return filteredCards; 
    }
  }

  resetFilters = () => {
    this.setState({ filterActive: false, bodyFilter: "", booksFilter: [], topicsFilter: []})
  }

	render() {
    let { showComponent, showAddCardModal, editingCard, loading, showFilterCardsModal, filterActive, bodyFilter, booksFilter, topicsFilter } = this.state;
    let { cards, deleteCard, upsertCard, upsertBook, books, upsertTopic, topics } = this.props;
    return (
      <div>
        <div className="subnav-container">
        <button 
          onClick={() => this.showFilterModal()}
          className="main-button"
          disabled={loading}
        >Filter Cards</button>
        {filterActive && (
          <button 
            onClick={() => this.resetFilters()}
            className="main-button"
            disabled={loading}
          >Clear Filters</button>
        )}
        <button 
          onClick={() => this.showCardModal()}
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
        </div>
        {showComponent == "Grid View" && !loading && (
          <CardGridView
            cards={this.filterCards(bodyFilter, booksFilter, topicsFilter)}
            onDelete={deleteCard}
            onEdit={this.showCardModal}
          ></CardGridView>
        )}
        {showComponent == "Flash View" && !loading && (
          <CardFlashView
            cards={cards}
            onDelete={deleteCard}
            onEdit={this.showCardModal}
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
            upsertBook={upsertBook}
            topics={topics}
            addTopic={upsertTopic}
          ></AddOrEditCard>
        )}
        {showFilterCardsModal && (
          <FilterModal
            topics={topics}
            books={books}
            onClose={this.closeModal}
            onSubmit={this.onSubmitFilter}
          ></FilterModal>
        )}
      </div>
    )
	}
}

export default connect(null, {
  deleteCard,
  upsertCard,
})
(CardScreen)