import React from 'react'; 
import './addOrEditCard.css';

const newCard = {
  body: "",
}

export class AddOrEditCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: props.card || newCard
    }
    console.log()
  }

  onType = (event) => {
    this.setState({ card: {body: event.target.value }});
  }

  onSubmit = () => {
    const { card } = this.state;
    const { addCard } = this.props;
    addCard(card);
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
            <textarea value={card.body} rows="10" cols="50" onChange={this.onType}></textarea>
          </div>
          <div className="modal-footer">
            <button onClick={onClose}>Close</button>
            <button onClick={onClose}>Save</button>
          </div>
        </div>
      </div>
    )
  }

}