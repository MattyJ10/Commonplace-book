import React from 'react'; 
import { connect } from 'react-redux'; 
import './displayErrorMessage.css';
import { hideError } from '../../Redux/actions/errorActions'

class DisplayErrorMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const { error, isOpen } = this.props; 
    if (error && isOpen) {
      this.hideAfterInterval();
    }
  }

  hideAfterInterval() {
    const { interval, hideError } = this.props;
    setTimeout(() => {
      hideError()
    }, interval)
  }

  render() {
    const { error } = this.props;
    return (
      <p className="error-container">{error}</p>
    )
  }
}

const mapStateToProps = state => {
  let obj = {
    error: state.errorReducer.error,
    isOpen: state.errorReducer.isOpen
  }
  return obj; 
}

export default connect(mapStateToProps, {
  hideError
})
(DisplayErrorMessage); 