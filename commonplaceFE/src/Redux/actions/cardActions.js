import { hideError } from './messageActions';

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

export const upsertCardSuccess = (data, success) => ({
  type: UPSERT_CARD_SUCCESS,
  payload: { card: data.card, isEdit: data.isEdit },
  success
});

export const upsertCardError = error => ({
  type: UPSERT_CARD_ERROR,
  error
});

export const deleteCardBegin = () => ({
  type: DELETE_CARD_BEGIN
})

export const deleteCardSuccess = (data, success) => ({
  type: DELETE_CARD_SUCCESS,
  id: data,
  success
})

export const deleteCardError = error => ({
  type: DELETE_CARD_ERROR,
  error
})

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