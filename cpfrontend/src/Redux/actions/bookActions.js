export const FETCH_BOOKS_BEGIN   = 'FETCH_BOOKS_BEGIN';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export const ADD_BOOK_BEGIN   = 'ADD_BOOK_BEGIN';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';

export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN
});

export const fetchBooksSuccess = books => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books }
});

export const fetchBooksFailure = error => ({
  type: FETCH_BOOKS_FAILURE,
  payload: { error }
});

export function fetchBooks() {
  return dispatch => {
    dispatch(fetchBooksBegin());
    return fetch("http://localhost:5005/api/getBooks")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchBooksSuccess(json.books));
        return json.books;
      })
      .catch(error => dispatch(fetchBooksFailure(error)));
  }
}

export const addBookBegin = () => ({
  type: ADD_BOOK_BEGIN
});

export const addBookSuccess = book => ({
  type: ADD_BOOK_SUCCESS,
  payload: { book }
});

export const addBookFailure = error => ({
  type: ADD_BOOK_FAILURE,
  payload: { error }
});

export function addBook(book) {
  return dispatch => {
    dispatch(addBookBegin()); 
    let body = {
      book
    }
    return fetch("http://localhost:5005/api/addBook", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(addBookSuccess(json));
      })
      .catch(error => dispatch(addBookFailure(error)));
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}