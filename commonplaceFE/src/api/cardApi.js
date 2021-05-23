import {
  upsertCardSuccess,
  upsertCardError,
  deleteCardSuccess,
  deleteCardError,
  fetchCardsSuccess,
  fetchCardsError,
} from '../Redux/actions/cardActions'; 
import { setError } from '../Redux/actions/messageActions'; 
import { fetchWithTimeout } from './apiUtils';

export function upsertCard(card, isEdit) {
  return async dispatch => {
    let body = {
      card,
      isEdit
    }
    try {
      let request = await fetchWithTimeout("http://localhost:5005/api/addCard", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        timeout: 10000
      });
      let response = await request.json();

      if (response.status == "ok") {
        dispatch(upsertCardSuccess(response.data, response.message));
      } else {
        dispatch(upsertCardError(response.error))
      }
    } catch(error) {
      if (error.name === 'AbortError') {
        dispatch(setError("Timeout occurred adding card, try again later"));
      } else {
        dispatch(upsertCardError(error))
      }
      // rethrow here so component's catch block is called as well
      throw error;
    }
  }
}

export function deleteCard(id) {
  return async dispatch => {
    try {
      let request = await fetchWithTimeout("http://localhost:5005/api/deleteCard/" + id, {timeout: 10000});
      let response = await request.json();
      if (response.status == "ok") {
        dispatch(deleteCardSuccess(response.data, response.message));
      } else {
        dispatch(deleteCardError(response.error));
      }
    } catch(error) {
      if (error.name === 'AbortError') {
        dispatch(setError("Timeout occurred deleting card, try again later"))
      } else {
        dispatch(deleteCardError(error))
      }
    }
  }
}

export function fetchCards() {
  return async dispatch => {
    try {
      let request = await fetchWithTimeout("http://localhost:5005/api/getCards", {timeout: 10000});
      let response = await request.json();
      if (response.status == "ok") {
        dispatch(fetchCardsSuccess(response.data));
      } else {
        dispatch(fetchCardsError(response.error));
      }
      return;
    } catch(error) {
      if (error.name === 'AbortError') {
        dispatch(setError("Timeout occurred grabbing cards, try again later"))
      } else {
        dispatch(fetchCardsError(error));
      }
      throw error; 
    }
  };
}