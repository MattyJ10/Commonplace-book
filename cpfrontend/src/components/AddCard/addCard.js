import React from 'react';
import './addCard.css';

export class AddCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {cardBody: ""}

    this.handleChange = this.handleChange.bind(this);
  }

  saveCard() {
    let { cardBody } = this.state;
    let cardObject = {
      body: cardBody
    }
    this.props.addCard(cardObject);
    this.setState({cardBody: ""});
  }

  handleChange(event) {
    this.setState({ cardBody: event.target.value});
  }

  render() {
    let { cardBody } = this.state;
    return (
      <div style={{marginTop: "10vh", textAlign: "center"}}>
        <textarea 
          rows="18" 
          cols="70"
          value={cardBody}
          onChange={this.handleChange}
        ></textarea>
        <button 
          style={{display: "block", margin: "10px auto"}}
          onClick={() => this.saveCard()}
        >Submit</button>
      </div>
    )
  }

}