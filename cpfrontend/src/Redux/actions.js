export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const FETCH_CARDS_BEGIN   = 'FETCH_CARDS_BEGIN';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

export const ADD_CARD_BEGIN = 'ADD_CARD_BEGIN'
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS'
export const ADD_CARD_ERROR = 'ADD_CARD_ERROR'

export const DELETE_CARD_BEGIN = 'DELETE_CARD_BEGIN'
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS'
export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR'

export const addCardBegin = () => ({
  type: ADD_CARD_BEGIN,
});

export const addCardSuccess = response => ({
  type: ADD_CARD_SUCCESS,
  payload: { card: response.card, msg: response.msg }
});

export const addCardError = error => ({
  type: ADD_CARD_ERROR,
  payload: { msg: error.msg }
});

export function addCard(card) {
  return dispatch => {
    dispatch(addCardBegin());
    let body = {
      card
    }
    return fetch("http://localhost:5005/api/addCard", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(addCardSuccess(json));
    })
    .catch(error => dispatch(fetchCardsFailure(error)));
  }
}

export const deleteCardBegin = () => ({
  type: DELETE_CARD_BEGIN
})

export const deleteCardSuccess = id => ({
  type: DELETE_CARD_SUCCESS,
  payload: { id }
})

export const deleteCardError = () => ({
  type: DELETE_CARD_ERROR
})

export function deleteCard(id) {
  return dispatch => {
    dispatch(deleteCardBegin()); 
    return fetch("http://localhost:5005/api/deleteCard/" + id)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(deleteCardSuccess(json.id));
    }) 
    .catch(error => dispatch(deleteCardError(error)));
  }
}

export const fetchCardsBegin = () => ({
  type: FETCH_CARDS_BEGIN
});

export const fetchCardsSuccess = cards => ({
  type: FETCH_CARDS_SUCCESS,
  payload: { cards }
});

export const fetchCardsFailure = error => ({
  type: FETCH_CARDS_FAILURE,
  payload: { error }
});

export function fetchCards() {
  return dispatch => {
    dispatch(fetchCardsBegin());
    return fetch("http://localhost:5005/api/getCards")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCardsSuccess(json.cards));
        return json.cards;
      })
      .catch(error => dispatch(fetchCardsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}