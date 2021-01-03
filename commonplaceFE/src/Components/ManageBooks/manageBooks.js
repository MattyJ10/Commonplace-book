import React from 'react'; 
import './manageBooks.css';
import OptionsTable from '../OptionsTable/optionsTable';
import LoadingSpinner from '../LoadingSpinner/loadingSpinner';

export default class CardScreen extends React.Component {

  state = {
    loading: false,
  }

  handleDelete = (book) => {
    const { deleteBook } = this.props;
    // setTimeout(() => {
    //   deleteBook(book._id).then(() => {
    //     this.setState({ loading: false });
    //   }).catch((err) => {
    //     console.log(err);
    //     this.setState({ loading: false })
    //   })
    // })
    console.log(book); 
  }

  handleEdit = (book) => {
    console.log(book); 
  }

  render() {
    const { books } = this.props;
    const { loading } = this.state; 
    return (
      <div className="manage-container">
        {!loading && (
           <OptionsTable
            items={books}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            tableLabel={"Book Title"}
            mainField={"displayTitle"}
           ></OptionsTable>
        )}
        {loading && (
          <LoadingSpinner></LoadingSpinner>
        )}
       
      </div>
    )
  }

}