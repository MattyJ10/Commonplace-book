import React from 'react'; 
import '../../Stylesheets/modal.css';
import LoadingSpinner from '../../Components/LoadingSpinner/loadingSpinner';

const newTopic = {
  topic: "",
}

export default class AddOrEditTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: props.topic || newTopic,
      topicInputError: false,
      loading: false,
    }
  }

  handleInputChange = (event) => {
    const { topic } = this.state;
    let updatedTopic = {
      ...topic, 
      topic: event.target.value,
    }
    this.setState({ 
      topic: updatedTopic, 
      topicInputError: updatedTopic.topic.length == 0 
    })
  }

  onSubmit = () => {
    const { upsertTopic, onClose, isEdit, refetchCards } = this.props; 
    const { topic } = this.state;
    if (topic.topic.length > 0) {
      this.setState({ loading: true })
      setTimeout(async () => {
        try {
          await upsertTopic(topic, isEdit);
          await refetchCards();
          this.setState({ loading: false });
          onClose()
        } catch(error) {
          this.setState({ loading: false });
        }
      }, 500)
    } else {
      this.setState({ topicInputError: topic.topic.length == 0 })
    }
  }

  render() {
    const { onClose } = this.props;
    const { topic, topicInputError, loading } = this.state;
    return (
      <div className="modal-container">
        <div className="modal-window">
          <div className="modal-header">
            Add Topic
          </div>
          {!loading && [
            <div className="modal-input-container" key="addTopicNotShown1">
              <div className="modal-input-group">
                <label className="modal-input-label">Topic</label>
                <div className="modal-input-container">
                  <input
                    name="title"
                    className="modal-input"
                    value={topic.topic} 
                    onChange={this.handleInputChange}
                  ></input>
                </div>
                { topicInputError && <p className="modal-input-error">* Topic is required</p>}
              </div>
            </div>,
            <div className="modal-footer" key="addTopicNotShown2">
              <button 
                onClick={() => onClose()}
                className="main-button"
              >Cancel</button>
              <button 
                onClick={() => this.onSubmit()}
                className="main-button"
              >Save</button>
            </div>
          ]}
          {loading && (
            <LoadingSpinner></LoadingSpinner>
          )}
        </div>
      </div>
    )
  }
}