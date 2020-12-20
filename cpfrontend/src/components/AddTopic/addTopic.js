import React from 'react'; 
import '../../Stylesheets/modal.css';

export class AddTopic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newTopic: {
        topic: ""
      }
    }
  }

  onNewTopicChange = (event) => {
    const { newTopic } = this.state;
    let updatedTopic = {
      ...newTopic,
      topic: event.target.value
    }
    this.setState({ newTopic: updatedTopic })
  }

  onAddNewTopic = () => {
    const { addTopic, onAddTopicSuccess, onAddTopicFailure } = this.props; 
    const { newTopic } = this.state;
    if (newTopic.topic.length > 0)
      addTopic(newTopic).then(onAddTopicSuccess, onAddTopicFailure);
  }

  render() {
    const { onCancel } = this.props;
    return [
      <div className="modal-input-container" key="addTopicShown1">
        <div className="modal-input-group">
        <label className="modal-input-label">New Topic</label>
        <input 
          className="modal-input" 
          maxLength="100"
          onChange={this.onNewTopicChange}
        ></input>
      </div>
    </div>,
    <div className="modal-footer" key="addTopicShown2">
      <button 
        onClick={() => onCancel()}
        className="main-button"
      >Cancel</button>
      <button 
        onClick={() => this.onAddNewTopic()}
        className="main-button"
      >Save</button>
    </div>
    ]
  }
}