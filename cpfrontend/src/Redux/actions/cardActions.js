export const FETCH_CARDS_BEGIN   = 'FETCH_CARDS_BEGIN';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

export const UPSERT_CARD_BEGIN = 'UPSERT_CARD_BEGIN'
export const UPSERT_CARD_SUCCESS = 'UPSERT_CARD_SUCCESS'
export const UPSERT_CARD_ERROR = 'UPSERT_CARD_ERROR'

export const DELETE_CARD_BEGIN = 'DELETE_CARD_BEGIN'
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS'
export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR'

export const upsertCardBegin = () => ({
  type: UPSERT_CARD_BEGIN,
});

export const upsertCardSuccess = (response, isEdit) => ({
  type: UPSERT_CARD_SUCCESS,
  payload: { card: response.card, msg: response.msg, isEdit }
});

export const upsertCardError = error => ({
  type: UPSERT_CARD_ERROR,
  payload: { msg: error.msg }
});

export function upsertCard(card, isEdit) {
  return dispatch => {
    dispatch(upsertCardBegin());
    let body = {
      card,
      isEdit
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
        if (json.isEdit) {
          dispatch(upsertCardSuccess(json, true));
        } else {
          dispatch(upsertCardSuccess(json, false));
        }
      })
      .catch(error => dispatch(upsertCardError(error)));
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