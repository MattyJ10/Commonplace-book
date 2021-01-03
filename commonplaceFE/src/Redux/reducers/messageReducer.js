import { SET_ERROR,
  HIDE_MESSAGE
} from "../actions/messageActions";

const initState = {
  error: null,
  success: null,
  isOpen: false
};

export default function messageReducer(state = initState, action){
  const { error, success } = action;
  if(error){
    return {
      error: error,
      success: null,
      isOpen: true
    }
  } else if (success) {
    return {
      success: success,
      isOpen: true,
      error: null,
    }
  }
  else if (action.type === HIDE_MESSAGE) {
    return {
      error: null,
      success: null,
      isOpen: false
    }
  }

  return state;
}