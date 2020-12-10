import React from 'react'; 
import './addOrEditCard.css';

const newCard = {
  body: "",
}

export class AddOrEditCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: props.card || newCard,
      isEdit: props.card ? true : false
    }
  }

  onBodyChange = (event) => {
    const { card } = this.state;
    let updatedCard = {
      ...card,
      body: event.target.value
    }
    this.setState({ card: updatedCard });
  }

  onBookChange = (event) => {
    const { card } = this.state;
    let updatedCard = {
      ...card,
      book: event.target.value
    }
    this.setState({ card: updatedCard });
  }

  onTopicChange = (event) => {
    const { card } = this.state;
    let updatedCard = {
      ...card,
      topic: event.target.value
    }
    this.setState({ card: updatedCard });
  }

  onSubmit = () => {
    const { card, isEdit } = this.state;
    const { addCard, onClose } = this.props;
    addCard(card, isEdit);
    onClose();
  }

  render() {
    const { card } = this.state;
    const { title, onClose } = this.props; 
    return (
      <div className="modal-container">
        <div className="modal-window">
          <div className="modal-header">
            {title}
          </div>
          <div className="modal-input-container">
            <div className="modal-input-group">
              <label className="modal-input-label">Book</label>
              <input className="modal-input" maxLength="100" value={card.book} onChange={this.onBookChange}></input>
            </div>
            <div className="modal-input-group">
              <label className="modal-input-label">Topic</label>
              <input className="modal-input" maxLength="100" value={card.topic} onChange={this.onTopicChange}></input>
            </div>
            <div className="modal-input-group">
              <label className="modal-input-label">Body</label>
              <textarea style={{resize: "none"}} value={card.body} rows="10" cols="36" onChange={this.onBodyChange}></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => onClose()}>Close</button>
            <button onClick={() => this.onSubmit()}>Save</button>
          </div>
        </div>
      </div>
    )
  }

}