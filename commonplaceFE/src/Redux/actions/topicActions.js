export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';

export const UPSERT_TOPIC_SUCCESS = 'ADD_TOPIC_SUCCESS';
export const UPSERT_TOPIC_FAILURE = 'ADD_TOPIC_FAILURE';

export const DELETE_TOPIC_SUCCESS = 'DELETE_TOPIC_SUCCESS';
export const DELETE_TOPIC_FAILURE = 'DELETE_TOPIC_FAILURE';

export const fetchTopicsSuccess = topics => ({
  type: FETCH_TOPICS_SUCCESS,
  payload: { topics }
});

export const fetchTopicsFailure = error => ({
  type: FETCH_TOPICS_FAILURE,
  error
});

export const upsertTopicSuccess = (data, success) => ({
  type: UPSERT_TOPIC_SUCCESS,
  payload: { topic: data.topic, isEdit: data.isEdit },
  success
});

export const upsertTopicFailure = error => ({
  type: UPSERT_TOPIC_FAILURE,
  error
});

export const deleteTopicSuccess = (id, success) => ({
  type: DELETE_TOPIC_SUCCESS,
  id,
  success
});

export const deleteTopicFailure = error => ({
  type: DELETE_TOPIC_FAILURE,
  error
});

