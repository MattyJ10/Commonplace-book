import React from 'react'; 
import ManageItems from '../../Components/ManageItems/manageItems';
import { connect } from "react-redux";
import AddOrEditTopic from '../../Modals/AddOrEditTopic/addOrEditTopic';
import { upsertTopic, deleteTopic } from '../../api/topicApi'; 
import { fetchCards } from '../../api/cardApi'; 
import './TopicScreen.css';

class TopicScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: "Manage Topics",
      showEditTopicModal: false,
    }
  }

  onNavChange = (destination) => {
    this.setState({ showComponent: destination })
  }

  onEditTopic = (type, item = null) => {
    this.setState({ showEditTopicModal: true, editingTopic: item, isEditTopic: item ? true : false })
  }

  closeModal = () => {
    this.setState({ showEditTopicModal: false })
  }

  render() {
    const { topics, fetchCards, deleteTopic, upsertTopic } = this.props;
    const { showComponent, showEditTopicModal, editingTopic, isEditTopic } = this.state;
    return (
      <div>
        <div className="subnav-container">
          <button 
            onClick={() => this.onEditTopic("Topic")}
            className="main-button"
          >Add Topic</button>
          {/* <button 
            onClick={() => this.onNavChange('Manage Topics')}
            className="main-button"
          >Manage Topics</button> */}
        </div>
        {showComponent == "Manage Topics" && (
          <ManageItems
            items={topics}
            tableTitle="Topic"
            mainField="displayTopic"
            deleteTopic={deleteTopic}
            handleEdit={this.onEditTopic}
            refetchCards={fetchCards}
            type="Topic"
          ></ManageItems>
        )}
        {showEditTopicModal && (
          <AddOrEditTopic
            topic={editingTopic}
            onClose={this.closeModal}
            upsertTopic={upsertTopic}
            refetchCards={fetchCards}
            isEdit={isEditTopic}
          ></AddOrEditTopic>
        )}
      </div>
    )
  }
}

export default connect(null, {
  deleteTopic,
  upsertTopic,
  fetchCards
})
(TopicScreen)