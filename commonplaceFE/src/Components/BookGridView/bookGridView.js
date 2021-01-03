import React from 'react'; 
import './bookGridView.css';
import IndividualBook from '../IndividualBook/individualBook';

export default class BookGridView extends React.Component {

  render() {
    const { books, onEdit, onDelete } = this.props;
    return (
      <div>
        {books && books.length > 0 && (
          <div className="grid-view-container">
            {books.map((book, index) => {
              return <IndividualBook
                book={book}
                onEdit={onEdit}
                onDelete={onDelete}
                key={book._id}
              ></IndividualBook>
            })}
          </div>
        )}
        {books && books.length == 0 && (
          <p style={{textAlign: 'center'}}>No Books In View</p>
        )}
      </div>
    )
  }

}