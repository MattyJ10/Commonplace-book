import React from 'react'; 
import './listCards.css';

export class ListCards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    let { cards, onDelete, onEdit } = this.props;
    return (
      <div style={{marginTop: "10vh", textAlign: "center"}}>
        <table style={{margin: "auto", width: "80%"}}>
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Text</th>
              <th colSpan="2">Options</th>
            </tr>
          </thead>
          <tbody>
          {cards && cards.map((card, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td style={{color: "black"}}>{card.body}</td>
                <td><button onClick={() => onDelete(card['_id'])}>Delete</button></td>
                <td><button onClick={() => onEdit(card)}>Edit</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}