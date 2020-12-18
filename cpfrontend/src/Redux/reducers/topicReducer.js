import { 
  FETCH_TOPICS_BEGIN,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
  ADD_TOPIC_BEGIN,
  ADD_TOPIC_SUCCESS,
  ADD_TOPIC_FAILURE
} from "../actions/topicActions";

let initialTopicState = {
  topics: [],
  loading: false,
  error: null
}

function topicReducer(state = initialTopicState, action) {
  switch(action.type) {
    case FETCH_TOPICS_BEGIN:
      return {
        ...state, 
        loading: true,
        error: null
      };
    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        topics: action.payload.topics
      };
    case FETCH_TOPICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        topics: []
      }
    case ADD_TOPIC_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ADD_TOPIC_SUCCESS:
      return {
        ...state,
        topics: [...state.topics, action.payload.topic.topic],
        loading: false,
        error: null
      }
    case ADD_TOPIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.msg
      }
    default:
      return state;
  }
}

export default topicReducer;