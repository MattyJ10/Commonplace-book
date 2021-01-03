import { 
  FETCH_TOPICS_BEGIN,
  FETCH_TOPICS_SUCCESS,
  ADD_TOPIC_BEGIN,
  ADD_TOPIC_SUCCESS,
} from "../actions/topicActions";

let initialTopicState = {
  topics: [],
  loading: false,
}

function topicReducer(state = initialTopicState, action) {
  switch(action.type) {
    case FETCH_TOPICS_BEGIN:
      return {
        ...state, 
        loading: true,
      };
    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        topics: action.payload.topics
      };
    case ADD_TOPIC_BEGIN:
      return {
        ...state,
        loading: true,
      }
    case ADD_TOPIC_SUCCESS:
      return {
        ...state,
        topics: [...state.topics, action.payload.topic],
        loading: false,
      }
    default:
      return state;
  }
}

export default topicReducer;