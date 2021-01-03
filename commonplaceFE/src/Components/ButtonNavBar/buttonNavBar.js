import React from 'react'; 
import './buttonNavBar.css';

export class ButtonNavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    console.log(props);
  }

  render() {
    const { labels, navChange } = this.props;
    return (
      <div style={{textAlign: "center", marginTop: "5%"}}>
        {labels && labels.map((label) => {
          return <button onClick={() => navChange(label)}>{label}</button>
        })}
      </div>
    )
  }

}