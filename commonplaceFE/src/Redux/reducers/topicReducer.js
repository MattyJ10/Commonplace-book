import { 
  FETCH_TOPICS_SUCCESS,
  UPSERT_TOPIC_SUCCESS,
  DELETE_TOPIC_SUCCESS,
} from "../actions/topicActions";

let initialTopicState = {
  topics: [],
}

function topicReducer(state = initialTopicState, action) {
  switch(action.type) {
    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        topics: action.payload.topics
      };
    case UPSERT_TOPIC_SUCCESS:
      if (action.payload.isEdit) {
        let updatedTopic = action.payload.topic;
        return {
          ...state, 
          topics: state.topics.map(topic => topic._id === updatedTopic._id ?
            updatedTopic :
            topic
          )
        }
      } else {
        return {
          ...state,
          topics: [...state.topics, action.payload.topic],
        }
      }
    case DELETE_TOPIC_SUCCESS:
      let currentList = state.topics;
      let index = currentList.findIndex(item => item._id === action.id); 
      let newList = [...currentList.slice(0, index), ...currentList.slice(index+1)]
      return {
        ...state,
        topics: newList
      }
    default:
      return state;
  }
}

export default topicReducer;