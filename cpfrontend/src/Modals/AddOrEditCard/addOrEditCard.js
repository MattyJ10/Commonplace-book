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
          <div className="modal-body">
            <textarea value={card.body} rows="10" cols="50" onChange={this.onBodyChange}></textarea>
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