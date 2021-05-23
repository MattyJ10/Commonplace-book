import React from 'react'; 
import './Dashboard.css';
import CardScreen from '../CardScreen/CardScreen';
import { fetchCards } from '../../api/cardApi';
import { fetchBooks } from '../../api/bookApi';
import { fetchTopics } from '../../api/topicApi';
import { connect } from "react-redux";
import LoadingSpinner from '../../Components/LoadingSpinner/loadingSpinner';
import BookScreen from '../BookScreen/BookScreen';
import TopicScreen from '../TopicScreen/TopicScreen'; 

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: "cards",
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
    this.setState({ tab: destination })
  }

  render() {
    const { cards, topics, books } = this.props;
    const { tab, loading } = this.state; 
    return (
      <div className="home-container">
        <div className="dashboard-nav-container">
          <button 
            onClick={() => this.onNavChange('cards')}
            className={tab == 'cards' ? "dashboard-nav-button selected-dashboard-nav-button" : "dashboard-nav-button"}
          >Cards</button>
          <button 
            onClick={() => this.onNavChange('books')}
            className={tab == 'books' ? "dashboard-nav-button selected-dashboard-nav-button" : "dashboard-nav-button"}
          >Books</button>
          <button 
            onClick={() => this.onNavChange('topics')}
            className={tab == 'topics' ? "dashboard-nav-button selected-dashboard-nav-button" : "dashboard-nav-button"}
          >Topics</button>
        </div>
        { tab == "cards" && !loading && (
          <CardScreen
            cards={cards}
            topics={topics}
            books={books}
          ></CardScreen>
        )}
        { tab == "books" && !loading && (
          <BookScreen
            books={books}
          ></BookScreen>
        )}
        { tab == "topics" && !loading && (
          <TopicScreen
            topics={topics}
          ></TopicScreen>
        )}
        {loading && (
          <LoadingSpinner></LoadingSpinner>
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
  fetchCards,
  fetchTopics,
  fetchBooks,
})
(Dashboard)