import React from 'react'; 
import '../../Stylesheets/modal.css';
import LoadingSpinner from '../../Components/LoadingSpinner/loadingSpinner';

const newBook = {
  title: "",
  author: "", 
}

export default class AddOrEditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: props.book || newBook,
      titleInputError: false,
      authorInputError: false,
      loading: false,
    }
  }

  handleInputChange = (event) => {
    const { book } = this.state;
    const target = event.target; 
    if (target.name == 'title') {
      let updatedBook = {
        ...book,
        title: event.target.value,
      }
      this.setState({ 
        book: updatedBook, 
        titleInputError: updatedBook.title.length == 0 
      })
    } else if (target.name == 'author') {
      let updatedBook = {
        ...book,
        author: event.target.value,
      }
      this.setState({ 
        book: updatedBook, 
        authorInputError: updatedBook.author.length == 0 
      })
    }
  }

  onSubmit = () => {
    const { upsertBook, onClose, isEdit, refetchCards } = this.props; 
    const { book } = this.state;
    if (book.title.length > 0 && book.author.length > 0) {
      this.setState({ loading: true })
      setTimeout(async () => {
        try {
          await upsertBook(book, isEdit);
          await refetchCards();
          this.setState({ loading: false });
          onClose();
        } catch(error) {
          this.setState({ loading: false });
        }
      }, 500)
    } else {
      this.setState({ titleInputError: book.title.length == 0, authorInputError: book.author.length == 0 })
    }
  }

  render() {
    const { onClose } = this.props;
    const { book, titleInputError, authorInputError, loading } = this.state;
    return (
      <div className="modal-container">
          <div className="modal-window">
            <div className="modal-header">
              Add Book
            </div>
            {!loading && [
              <div className="modal-input-container" key="addBookNotShown1">
                <div className="modal-input-group">
                  <label className="modal-input-label">Title</label>
                  <div className="modal-input-container">
                    <input
                      name="title"
                      className="modal-input"
                      value={book.title} 
                      onChange={this.handleInputChange}
                    ></input>
                  </div>
                  { titleInputError && <p className="modal-input-error">* Title is required</p>}
                </div>
                <div className="modal-input-group">
                  <label className="modal-input-label">Author</label>
                  <div className="modal-input-container">
                    <input
                      name="author"
                      className="modal-input"
                      value={book.author} 
                      onChange={this.handleInputChange}
                    ></input>
                  </div>
                  { authorInputError && <p className="modal-input-error">* Author is required</p>}
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
            {loading && (
              <LoadingSpinner></LoadingSpinner>
            )}
          </div>
      </div>
    )
  }
}