import React from 'react'; 
import './addBook.css';

export class AddBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newBook: {
        title: ""
      }
    }
  }

  onNewBookChange = (event) => {
    const { newBook } = this.state;
    let updatedBook = {
      ...newBook,
      title: event.target.value
    }
    this.setState({ newBook: updatedBook })
  }

  onAddNewBook = () => {
    const { addBook, onAddBookSuccess, onAddBookFailure } = this.props; 
    const { newBook } = this.state;
    if (newBook.title.length > 0)
      addBook(newBook).then(onAddBookSuccess, onAddBookFailure);
  }

  render() {
    const { onCancel } = this.props;
    return [
      <div className="modal-input-container" key="addBookShown1">
        <div className="modal-input-group">
        <label className="modal-input-label">Book Title</label>
        <input 
          className="modal-input" 
          maxLength="100"
          onChange={this.onNewBookChange}
        ></input>
      </div>
    </div>,
    <div className="modal-footer" key="addBookShown2">
      <button 
        onClick={() => onCancel()}
        className="main-button"
      >Cancel</button>
      <button 
        onClick={() => this.onAddNewBook()}
        className="main-button"
      >Save</button>
    </div>
    ]
  }
}