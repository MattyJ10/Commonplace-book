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
  payload: { error }
});

export function fetchTopics() {
  return dispatch => {
    dispatch(fetchTopicsBegin());
    return fetch("http://localhost:5005/api/getTopics")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchTopicsSuccess(json.topics));
        return json.topics;
      })
      .catch(error => dispatch(fetchTopicsFailure(error)));
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
  payload: { error }
});

export function addTopic(topic) {
  return dispatch => {
    dispatch(addTopicBegin()); 
    let body = {
      topic
    }
    return fetch("http://localhost:5005/api/addTopic", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(addTopicSuccess(json));
      })
      .catch(error => dispatch(addTopicFailure(error)));
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}