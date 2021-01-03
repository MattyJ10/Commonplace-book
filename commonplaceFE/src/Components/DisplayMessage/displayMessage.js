import React from 'react'; 
import { connect } from 'react-redux'; 
import './displayMessage.css';
import { hideMessage } from '../../Redux/actions/messageActions'
import { BiMessageAltX, BiMessageAltCheck } from "react-icons/bi";
import { IconContext } from 'react-icons';

class DisplayMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shouldFadeOut: false
    };
  }

  componentDidUpdate() {
    const { error, isOpen, success } = this.props; 
    if ((error || success) && isOpen) {
      this.hideAfterInterval();
    }
  }

  hideAfterInterval() {
    const { interval, hideMessage } = this.props;
    setTimeout(() => {
      hideMessage()
    }, interval)
  }

  render() {
    const { error, isOpen, success } = this.props;
    const { shouldFadeOut } = this.state;
    let errorClasses = "message-container display-message-error fade-in"
    let successClasses = "message-container display-message-success fade-in"
    if (shouldFadeOut) {
      errorClasses += "fade-out";
      successClasses += "fade-out";
    }
    return (
      <IconContext.Provider value={{ style: {fontSize: '30px', color: "white", verticalAlign: "middle"}}}>
        {error && isOpen && (
          <p className={errorClasses}><BiMessageAltX /> {error}</p>
        )}
        {success && isOpen && (
          <p className={successClasses}><BiMessageAltCheck /> {success}</p>
        )}
      </IconContext.Provider>
    )
  }
}

const mapStateToProps = state => {
  let obj = {
    error: state.messageReducer.error,
    success: state.messageReducer.success,
    isOpen: state.messageReducer.isOpen
  }
  return obj; 
}

export default connect(mapStateToProps, {
  hideMessage
})
(DisplayMessage); 