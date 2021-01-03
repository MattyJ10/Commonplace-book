export const FETCH_BOOKS_BEGIN   = 'FETCH_BOOKS_BEGIN';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export const ADD_BOOK_BEGIN   = 'ADD_BOOK_BEGIN';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';

export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books }
});

export const fetchBooksFailure = error => ({
  type: FETCH_BOOKS_FAILURE,
  error
});

export const addBookBegin = () => ({
  type: ADD_BOOK_BEGIN
});

export const addBookSuccess = (book, success) => ({
  type: ADD_BOOK_SUCCESS,
  payload: { book },
  success
});

export const addBookFailure = error => ({
  type: ADD_BOOK_FAILURE,
  error
});