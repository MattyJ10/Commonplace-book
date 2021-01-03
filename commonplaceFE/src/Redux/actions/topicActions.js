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


export const addTopicBegin = () => ({
  type: ADD_TOPIC_BEGIN
});

export const addTopicSuccess = (topic, success) => ({
  type: ADD_TOPIC_SUCCESS,
  payload: { topic },
  success
});

export const addTopicFailure = error => ({
  type: ADD_TOPIC_FAILURE,
  error
});

