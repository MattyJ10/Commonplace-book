import React from 'react'; 
import ManageItems from '../../Components/ManageItems/manageItems';
import { connect } from "react-redux";
import AddOrEditBook from '../../Modals/AddOrEditBook/addOrEditBook';
import { upsertBook, deleteBook } from '../../api/bookApi'; 
import { fetchCards } from '../../api/cardApi'; 
import './BookScreen.css';

class BookScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: "Manage Books",
      showEditBookModal: false,
    }
  }

  onNavChange = (destination) => {
    this.setState({ showComponent: destination })
  }

  onEditBook = (type, item = null) => {
    this.setState({ showEditBookModal: true, editingBook: item, isEditBook: item ? true : false })
  }

  closeModal = () => {
    this.setState({ showEditBookModal: false })
  }

  render() {
    const { books, fetchCards, deleteBook, upsertBook } = this.props;
    const { showComponent, showEditBookModal, editingBook, isEditBook } = this.state;
    return (
      <div>
        <div className="subnav-container">
          <button 
            onClick={() => this.onEditBook("Book")}
            className="main-button"
          >Add Book</button>
          {/* <button 
            onClick={() => this.onNavChange('Manage Books')}
            className="main-button"
          >Manage Books</button> */}
        </div>
        {showComponent == "Manage Books" && (
          <ManageItems
            items={books}
            tableTitle="Book"
            mainField="displayTitle"
            deleteBook={deleteBook}
            handleEdit={this.onEditBook}
            refetchCards={fetchCards}
            type="Book"
          ></ManageItems>
          // <BookGridView
          //   books={books}
          // ></BookGridView>
        )}
        {showEditBookModal && (
          <AddOrEditBook
            book={editingBook}
            onClose={this.closeModal}
            upsertBook={upsertBook}
            refetchCards={fetchCards}
            isEdit={isEditBook}
          ></AddOrEditBook>
        )}
      </div>
    )
  }
}

export default connect(null, {
  deleteBook,
  upsertBook,
  fetchCards
})
(BookScreen)