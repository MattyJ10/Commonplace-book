import React from 'react'; 
import '../../Stylesheets/modal.css';
import SearchableDropdown from '../../Components/SearchableDropdown/searchableDropdown';
import { AddTopic } from '../../Components/AddTopic/addTopic';
import { AddBook } from '../../Components/AddBook/addBook';
import LoadingSpinner from '../../Components/LoadingSpinner/loadingSpinner';

const newCard = {
  body: "",
}

export default class AddOrEditCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: props.card || newCard,
      isEdit: props.card ? true : false,
      showAddBook: false,
      showAddTopic: false,
      currentTitle: props.title,
      bookInputError: false,
      topicInputError: false,
      bodyInputError: false,
      loading: false,
    }
  }

  onBodyChange = (event) => {
    const { card } = this.state;
    let updatedCard = {
      ...card,
      body: event.target.value
    }
    let isError;
    if (updatedCard.body.length == 0) {
      isError = true; 
    } else {
      isError = false; 
    }
    this.setState({ card: updatedCard, bodyInputError: isError });
  }

  onSubmit = async () => {
    const { card, isEdit } = this.state;
    const { addCard, onClose } = this.props;

    let bookError = card.book == undefined ? true : false;
    let topicError = card.topic == undefined ? true : false;
    let bodyError = card.body.length == 0 ? true : false;

    if (bookError || topicError || bodyError) {
      this.setState({ bookInputError: bookError, topicInputError: topicError, bodyInputError: bodyError })
    } else {
      let self = this; 
      this.setState({ loading: true })
      setTimeout(async () => {
        try {
          await addCard(card, isEdit);
          self.setState({ loading: false })
          onClose();
        } catch(e) {
          self.setState({ loading: false })
        }
      }, 500)
    }
  }

  onAddNewItem = (type) => {
    if (type == 'book') {
      this.setState({showAddBook: true, currentTitle: "Add New Book"})
    } else if (type == 'topic') {
      this.setState({showAddTopic: true, currentTitle: "Add New Topic"})
    }
  }

  onCancelAdd = () => {
    const { title } = this.props; 
    this.setState({ showAddBook: false, showAddTopic: false, currentTitle: title })
  }

  onAddSuccess = () => {
    const { title } = this.props;
    this.setState({ showAddTopic: false, currentTitle: title, showAddBook: false})
  }

  onAddFailure = () => {
    const { title } = this.props;
    this.setState({ showAddTopic: false, currentTitle: title, showAddBook: false})
  }

  handleBookSelect = (book) => {
    const { card } = this.state;

    let updatedCard = {
      ...card,
      book: book
    }
    this.setState({ card: updatedCard, bookInputError: false });
  }

  handleBookDelete = () => {
    const { card } = this.state;

    let updatedCard = {
      ...card,
    }
    delete updatedCard.book;
    this.setState({ card: updatedCard, bookInputError: true });
  }

  handleTopicSelect = (topic) => {
    const { card } = this.state;
    let updatedCard = {
      ...card,
      topic: topic
    }
    this.setState({ card: updatedCard, topicInputError: false });
  }

  handleTopicDelete = () => {
    const { card } = this.state;

    let updatedCard = {
      ...card,
    }
    delete updatedCard.topic;
    this.setState({ card: updatedCard, topicInputError: true });
  }

  render() {
    const { card, showAddBook, showAddTopic, currentTitle, bodyInputError, bookInputError, topicInputError, loading } = this.state;
    const { onClose, books, topics, addBook, addTopic } = this.props; 
    return (
      <div className="modal-container">
        <div className="modal-window">
          <div className="modal-header">
            {currentTitle}
          </div>
          {!showAddBook && !showAddTopic && !loading && [
            <div className="modal-input-container" key="addBookNotShown1">
              <div className="modal-input-group">
                <label className="modal-input-label">Book</label>
                <div className="modal-input-button-container">
                  <div className="modal-sd-inline-container">
                    <SearchableDropdown
                      values={books}
                      emitChange={this.handleBookSelect}
                      emitDelete={this.handleBookDelete}
                      initialValue={card.book ? card.book.title : ""}
                      displayField="title"
                      isRequired
                    ></SearchableDropdown>
                  </div>
                  <button 
                    onClick={() => this.onAddNewItem('book')}
                    className="modal-inline-button main-button"
                  >Add Book</button>
                </div>
                { bookInputError && <p className="modal-input-error">* Book is required</p>}
              </div>
              <div className="modal-input-group">
                <label className="modal-input-label">Topic</label>
                <div className="modal-input-button-container">
                  <div className="modal-sd-inline-container">
                    <SearchableDropdown
                      values={topics}
                      emitChange={this.handleTopicSelect}
                      emitDelete={this.handleTopicDelete}
                      initialValue={card.topic ? card.topic.topic : ""}
                      displayField="topic"
                      isRequired
                    ></SearchableDropdown>
                  </div>
                  <button 
                    onClick={() => this.onAddNewItem('topic')}
                    className="modal-inline-button main-button"
                  >Add Topic</button>
                </div>
                { topicInputError && <p className="modal-input-error">* Topic is required</p>}
              </div>
              <div className="modal-input-group">
                <label className="modal-input-label">URL (Optional)</label>
                <div className="modal-input-container">
                  <input
                    className="modal-input"
                    value={card.url} onChange={this.onUrlChange}
                  ></input>
                </div>
              </div>
              <div className="modal-input-group">
                <label className="modal-input-label">Body</label>
                <textarea style={{resize: "none"}} value={card.body} rows="10" cols="42" onChange={this.onBodyChange}></textarea>
                { bodyInputError && <p className="modal-input-error">* Body is required</p>}
              </div>
            </div>,
            <div className="modal-footer" key="addBookNotShown2">
              <button 
                onClick={() => onClose()}
                className="main-button"
              >Cancel</button>
              <button 
                onClick={() => this.onSubmit()}
                className="main-button"
              >Save</button>
            </div>
          ]}
          {showAddBook && !loading && 
            <AddBook
              onCancel={this.onCancelAdd}
              addBook={addBook}
              onAddBookSuccess={this.onAddSuccess}
              onAddBookFailure={this.onAddFailure}
            ></AddBook>
          }
          {showAddTopic && !loading &&
            <AddTopic
              onCancel={this.onCancelAdd}
              addTopic={addTopic}
              onAddTopicSuccess={this.onAddSuccess}
              onAddTopicFailure={this.onAddFailure}
            ></AddTopic>
          }
          {loading && (
            <LoadingSpinner></LoadingSpinner>
          )}
        </div>
      </div>
    )
  }
}