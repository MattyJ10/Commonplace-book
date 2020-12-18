import { combineReducers } from 'redux'
import cardReducer from './cardReducer'
import bookReducer from './bookReducer'
import topicReducer from './topicReducer'

export default combineReducers({
  cardReducer,
  bookReducer,
  topicReducer
})