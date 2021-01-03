import React from 'react'; 
import '../../Stylesheets/modal.css';
import LoadingSpinner from '../LoadingSpinner/loadingSpinner';

export class AddTopic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newTopic: {
        topic: "",
        topicError: false,
        loading: false,
      }
    }
  }

  onNewTopicChange = (event) => {
    const { newTopic } = this.state;
    if (event.target.value.length > 0) this.setState({ topicError: false})
    let updatedTopic = {
      ...newTopic,
      topic: event.target.value,
    }
    this.setState({ newTopic: updatedTopic })
  }

  onAddNewTopic = () => {
    const { addTopic, onAddTopicSuccess, onAddTopicFailure } = this.props; 
    const { newTopic } = this.state;
    if (newTopic.topic.length > 0) {
      this.setState({ loading: true })
      setTimeout(() => {
        addTopic(newTopic).then(() => {
          this.setState({ loading: false });
          onAddTopicSuccess()
        }).catch((err) => {
          this.setState({ loading: false });
          onAddTopicFailure();
        })
      }, 500)
    } else {
      this.setState({ topicError: true })
    }
  }

  render() {
    const { onCancel } = this.props;
    const { loading, topicError } = this.state;
    return [
      <div className="modal-input-container" key="addTopicShown1">
        {!loading && (
          <div className="modal-input-group">
            <label className="modal-input-label">New Topic</label>
            <input 
              className="modal-input" 
              maxLength="100"
              onChange={this.onNewTopicChange}
            ></input>
            { topicError && <p className="modal-input-error">* Topic is required</p>}
          </div>
        )}
        {loading && (
          <LoadingSpinner></LoadingSpinner>
        )}
      </div>,
      <div className="modal-footer" key="addTopicShown2">
        <button 
          onClick={() => onCancel()}
          className="main-button"
          disabled={loading}
        >Cancel</button>
        <button 
          onClick={() => this.onAddNewTopic()}
          className="main-button"
          disabled={loading}
        >Save</button>
      </div>
    ]
  }
}