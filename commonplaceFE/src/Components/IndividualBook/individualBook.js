import React from 'react'; 
import './individualBook.css';

export default class IndividualBook extends React.Component {

  render() {
    const { book } = this.props; 
    return (
      <div className="individual-book-container">
        <p className="individual-book-title">{book.displayTitle}</p>
      </div>
    )
  }

}