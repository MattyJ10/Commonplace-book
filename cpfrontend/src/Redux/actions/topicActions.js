export const FETCH_TOPICS_BEGIN   = 'FETCH_TOPICS_BEGIN';
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';

export const ADD_TOPIC_BEGIN   = 'ADD_TOPIC_BEGIN';
export const ADD_TOPIC_SUCCESS = 'ADD_TOPIC_SUCCESS';
export const ADD_TOPIC_FAILURE = 'ADD_TOPIC_FAILURE';

export const fetchTopicsBegin = () => ({
  type: FETCH_TOPICS_BEGIN
});

export const fetchTopicsSuccess = topics => ({
  type: FETCH_TOPICS_SUCCESS,
  payload: { topics }
});

export const fetchTopicsFailure = error => ({
  type: FETCH_TOPICS_FAILURE,
  error
});

export function fetchTopics() {
  return async dispatch => {
    dispatch(fetchTopicsBegin());
    
    try {
      let request = await fetch("http://localhost:5005/api/getTopics");
      let response = await request.json();

      if (response.status == "ok") {
        dispatch(fetchTopicsSuccess(response.data));
      } else {
        dispatch(fetchTopicsFailure(response.error))
      }
    } catch(error) {
      dispatch(fetchTopicsFailure(error))
    }
  }
}

export const addTopicBegin = () => ({
  type: ADD_TOPIC_BEGIN
});

export const addTopicSuccess = topic => ({
  type: ADD_TOPIC_SUCCESS,
  payload: { topic }
});

export const addTopicFailure = error => ({
  type: ADD_TOPIC_FAILURE,
  error
});

export function addTopic(topic) {
  return async dispatch => {
    dispatch(addTopicBegin());
    try {
      let body = {
        topic
      }
      let request = await fetch("http://localhost:5005/api/addTopic", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      let response = await request.json();
      if (response.status == "ok") {
        dispatch(addTopicSuccess(response.data));
      } else {
        dispatch(addTopicFailure(response.error));
      }
    } catch(error) {
      dispatch(addTopicFailure(error));
    }
  }
}