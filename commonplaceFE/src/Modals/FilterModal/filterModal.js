import React from 'react'; 
import MultiSelectDropdown from '../../Components/MultiSelectDropdown/multiSelectDropdown';
import '../../Stylesheets/modal.css';

export default class FilterModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bodyText: "",
      selectedBooks: [],
      selectedTopics: [],
    }
  }

  handleTopicChange = (topicsList) => {
    this.setState({ selectedTopics: topicsList });
  }

  handleBookChange = (booksList) => {
    this.setState({ selectedBooks: booksList });
  }

  handleInputChange = (event) => {
    this.setState({ bodyText: event.target.value })
  }

  generateIdList = (arr) => {
    return arr.map((elem) => {
      return elem._id;
    })
  }

  submit = () => {
    const { onSubmit } = this.props;
    const { bodyText, selectedBooks, selectedTopics } = this.state; 

    let bookIds = this.generateIdList(selectedBooks); 
    let topicIds = this.generateIdList(selectedTopics); 
    onSubmit(bodyText, bookIds, topicIds); 
  }


  render() {
    const { topics, books, onClose } = this.props; 
    const { bodyText } = this.state;

    return (
      <div className="modal-container">
        <div className="modal-window">
          <div className="modal-header">
            Filter Cards
          </div>
          <div className="modal-input-container" key="input1">
            <div className="modal-input-group">
              <label className="modal-input-label">Body Contains:</label>
              <div className="modal-input-container">
                <input
                  name="contains"
                  className="modal-input"
                  value={bodyText} 
                  onChange={this.handleInputChange}
                ></input>
              </div>
            </div>
            <div className="modal-input-group">
              <label className="modal-input-label">Topics</label>
              <div className="modal-input-container">
                <MultiSelectDropdown
                  values={topics}
                  displayField="topic"
                  emitChange={this.handleTopicChange}
                >
                </MultiSelectDropdown>
              </div>
            </div>
            <div className="modal-input-group">
              <label className="modal-input-label">Books</label>
              <div className="modal-input-container">
                <MultiSelectDropdown
                  values={books}
                  displayField="title"
                  emitChange={this.handleBookChange}
                >
                </MultiSelectDropdown>
              </div>
            </div>
          </div>
          <div className="modal-footer" key="addBookNotShown2">
            <button 
              onClick={() => onClose()}
              className="main-button"
            >Cancel</button>
            <button 
              onClick={this.submit}
              className="main-button"
            >Save</button>
          </div>
        </div>
      </div>
    )
  }

}