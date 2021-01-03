export const SET_ERROR = "SET_ERROR";
export const HIDE_MESSAGE = "HIDE_MESSAGE";

export function setError(error) {
  return {
    type: SET_ERROR,
    error: error
  }
}

export function hideMessage(){
  return {
    type: HIDE_MESSAGE
  }
}