import {
  fetchTopicsSuccess,
  fetchTopicsFailure,
  addTopicSuccess,
  addTopicFailure,
  deleteTopicSuccess,
  deleteTopicFailure,
} from '../Redux/actions/topicActions'; 
import { setError } from '../Redux/actions/messageActions'; 
import { fetchWithTimeout } from './apiUtils'; 

export function fetchTopics() {
  return async dispatch => {
    try {
      let request = await fetchWithTimeout("http://localhost:5005/api/getTopics", {timeout: 10000});
      let response = await request.json();

      if (response.status == "ok") {
        dispatch(fetchTopicsSuccess(response.data));
      } else {
        dispatch(fetchTopicsFailure(response.error))
      }
    } catch(error) {
      if (error.name === 'AbortError') {
        dispatch(setError("Timeout occurred grabbing topics, try again later"));
      } else {
        dispatch(fetchTopicsFailure(error))
      }
      // rethrow here so component's catch block is called as well
      throw error;
    }
  }
}

export function addTopic(topic) {
  return async dispatch => {
    try {
      let body = {
        topic
      }
      let request = await fetchWithTimeout("http://localhost:5005/api/addTopic", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        timeout: 10000
      });
      let response = await request.json();
      if (response.status == "ok") {
        dispatch(addTopicSuccess(response.data, response.message));
      } else {
        dispatch(addTopicFailure(response.error));
      }
    } catch(error) {
      if (error.name === 'AbortError') {
        dispatch(setError("Timeout occurred adding topic, try again later"));
      } else {
        dispatch(addTopicFailure(error));
      }
      // rethrow here so component's catch block is called as well
      throw error;
    }
  }
}

export function deleteTopic(id) {
  return async dispatch => {
    try {
      let request = await fetchWithTimeout("http://localhost:5005/api/deleteTopic/" + id, 
        {
          timeout: 10000,
          method: 'delete',
        }
      );
      let response = await request.json(); 
      if (response.status == "ok") {
        dispatch(deleteTopicSuccess(response.data, response.message));
      } else {
        dispatch(deleteTopicFailure(response.error))
      }
    } catch(error) {
      if (error.name === 'AbortError') {
        dispatch(setError("Timeout occurred deleting topic, try again later"))
      } else {
        dispatch(deleteTopicFailure(error))
      }
      throw error; 
    }
  }
}