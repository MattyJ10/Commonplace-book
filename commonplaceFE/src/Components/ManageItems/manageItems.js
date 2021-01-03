import React from 'react'; 
import './manageItems.css';
import OptionsTable from '../OptionsTable/optionsTable';
import LoadingSpinner from '../LoadingSpinner/loadingSpinner';

export default class CardScreen extends React.Component {

  state = {
    loading: false,
  }

  onDelete = (id) => {
    console.log(this.props);
    console.log("here");
    if (this.props.type == "Book") {
      this.setState({ loading: true })
      setTimeout(() => {
        this.props.deleteBook(id)
          .then(() => {
            this.setState({ loading: false })
          })
          .catch((error) => {
            this.setState({ loading: false })
          })
      }, 500)
    } else if (this.props.type == "Topic") {
      this.setState({ loading: true })
      setTimeout(() => {
        this.props.deleteTopic(id)
          .then(() => {
            this.setState({ loading: false })
          })
          .catch((error) => {
            this.setState({ loading: false })
          })
      }, 500)
    }
  }

  render() {
    const { items, tableTitle, mainField, handleEdit, type } = this.props;
    const { loading } = this.state; 
    return (
      <div className="manage-container">
        {!loading && (
           <OptionsTable
            items={items}
            onDelete={this.onDelete}
            onEdit={handleEdit}
            tableLabel={tableTitle}
            mainField={mainField}
            type={type}
           ></OptionsTable>
        )}
        {loading && (
          <LoadingSpinner></LoadingSpinner>
        )}
       
      </div>
    )
  }

}