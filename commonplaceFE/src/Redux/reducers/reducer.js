import { combineReducers } from 'redux'
import cardReducer from './cardReducer'
import bookReducer from './bookReducer'
import topicReducer from './topicReducer'
import messageReducer from './messageReducer'

export default combineReducers({
  cardReducer,
  bookReducer,
  topicReducer,
  messageReducer,
})