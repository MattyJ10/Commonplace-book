import React from 'react'; 
import '../../Stylesheets/modal.css';
import LoadingSpinner from '../LoadingSpinner/loadingSpinner';

export class AddBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newBook: {
        title: "",
        loading: false,
        titleError: false,
      }
    }
  }

  onNewBookChange = (event) => {
    const { newBook } = this.state;
    if (event.target.value.length > 0) this.setState({ titleError: false })
    let updatedBook = {
      ...newBook,
      title: event.target.value,
    }
    this.setState({ newBook: updatedBook })
  }

  onAddNewBook = () => {
    const { upsertBook, onAddBookSuccess, onAddBookFailure } = this.props; 
    const { newBook } = this.state;
    if (newBook.title.length > 0) {
      this.setState({ loading: true })
      setTimeout(() => {
        upsertBook(newBook, false).then(() => {
          this.setState({ loading: false });
          onAddBookSuccess();
        }).catch((err) => {
          this.setState({ loading: false });
          onAddBookFailure();
        })
      }, 500)
    } else {
      this.setState({ titleError: true })
    }
  }

  render() {
    const { onCancel } = this.props;
    const { loading, titleError } = this.state;
    return [
      <div className="modal-input-container" key="addBookShown1">
        {!loading && (<div className="modal-input-group">
          <label className="modal-input-label">Book Title</label>
          <input 
            className="modal-input" 
            maxLength="100"
            onChange={this.onNewBookChange}
          ></input>
          { titleError && <p className="modal-input-error">* Book is required</p>}
        </div>
        )}
        {loading && (
          <LoadingSpinner></LoadingSpinner>
        )}
      </div>,
      <div className="modal-footer" key="addBookShown2">
        <button 
          onClick={() => onCancel()}
          className="main-button"
          disabled={loading}
        >Cancel</button>
        <button 
          onClick={() => this.onAddNewBook()}
          className="main-button"
          disabled={loading}
        >Save</button>
      </div>
    ]
  }
}