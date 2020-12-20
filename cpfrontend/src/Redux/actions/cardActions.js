import { hideError } from './errorActions';

export const FETCH_CARDS_BEGIN   = 'FETCH_CARDS_BEGIN';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR';

export const UPSERT_CARD_BEGIN = 'UPSERT_CARD_BEGIN'
export const UPSERT_CARD_SUCCESS = 'UPSERT_CARD_SUCCESS'
export const UPSERT_CARD_ERROR = 'UPSERT_CARD_ERROR'

export const DELETE_CARD_BEGIN = 'DELETE_CARD_BEGIN'
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS'
export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR'

export const upsertCardBegin = () => ({
  type: UPSERT_CARD_BEGIN,
});

export const upsertCardSuccess = (data) => ({
  type: UPSERT_CARD_SUCCESS,
  payload: { card: data.card, isEdit: data.isEdit }
});

export const upsertCardError = error => ({
  type: UPSERT_CARD_ERROR,
  error
});

export function upsertCard(card, isEdit) {
  return async dispatch => {
    dispatch(upsertCardBegin());
    let body = {
      card,
      isEdit
    }
    try {
      let request = await fetch("http://localhost:5005/api/addCard", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      let response = await request.json();

      if (response.status == "ok") {
        dispatch(upsertCardSuccess(response.data))
      } else {
        dispatch(upsertCardError(response.error))
      }
    } catch(error) {
      dispatch(upsertCardError(error))
    }
  }
}

export const deleteCardBegin = () => ({
  type: DELETE_CARD_BEGIN
})

export const deleteCardSuccess = id => ({
  type: DELETE_CARD_SUCCESS,
  payload: { id }
})

export const deleteCardError = error => ({
  type: DELETE_CARD_ERROR,
  error
})

export function deleteCard(id) {
  return async dispatch => {
    dispatch(deleteCardBegin()); 
    try {
      let request = await fetch("http://localhost:5005/api/deleteCard/" + id);
      let response = await request.json();
      if (response.status == "ok") {
        dispatch(deleteCardSuccess(response.data));
      } else {
        dispatch(deleteCardError(response.error));
      }
    } catch(error) {
      dispatch(deleteCardError(error))
    }
  }
}

export const fetchCardsBegin = () => ({
  type: FETCH_CARDS_BEGIN
});

export const fetchCardsSuccess = cards => ({
  type: FETCH_CARDS_SUCCESS,
  payload: { cards }
});

export const fetchCardsError = error => ({
  type: FETCH_CARDS_ERROR,
  error
});

export function fetchCards() {
  return async dispatch => {
    dispatch(fetchCardsBegin());
    try {
      let request = await fetch("http://localhost:5005/api/getCards");
      let response = await request.json();
      if (response.status == "ok") {
        dispatch(fetchCardsSuccess(response.data));
      } else {
        dispatch(fetchCardsError(response.error));
      }
      return;
    } catch(error) {
      dispatch(fetchCardsError(error));
    }
  };
}