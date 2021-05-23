import React from 'react'; 
import './individualCard.css';
import LoadingSpinner from '../LoadingSpinner/loadingSpinner';

export default class IndividualCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  handleDelete = (id) => {
    const { onDelete } = this.props;
    this.setState({ loading: true }) 
    let self = this; 
    setTimeout(() => {
      onDelete(id)
      .catch((err) => {
        self.setState({ loading: false })
      })
    }, 500)
  }
  
  render() {
    const { card, onDelete, onEdit, largerCard, isFlashCard } = this.props;
    const { loading } = this.state;
    let containerClass = "individual-card-container";
    if (largerCard) {
      containerClass += " larger-individual-card-container";
    }
    return (
      <div className={containerClass}>
        {!loading &&  [
          <div className="individual-card-header" key="individual-card-header">
            <h1 className="individual-card-title">{card.book ? card.book.displayTitle : ""}</h1>
            <h2 className="individual-card-title">{card.topic ? card.topic.displayTopic : ""}</h2>
          </div>,
          <div className="individual-card-sub-header" key="individual-card-sub-header">
            <button className="main-button" onClick={() => onEdit(card)}>Edit</button>
            {!isFlashCard && <button className="main-button" onClick={() => this.handleDelete(card._id)}>Delete</button>}
            {isFlashCard && <button className="main-button" onClick={() => onDelete(card._id)}>Delete</button>}
          </div>,
          <div className="individual-card-body-container" key="individual-card-body">
            <div className="individual-card-body">
              {card && card.body && <div className="individual-card-body-content">{card.body}</div>}
            </div>
          </div>
        ]}
        {loading && (
          <LoadingSpinner></LoadingSpinner>
        )}
      </div>
    )
  }

  

}
