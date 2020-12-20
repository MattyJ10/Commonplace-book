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
  error
});

export function fetchBooks() {
  return async dispatch => {
    dispatch(fetchBooksBegin());
    try {
      let request = await fetch("http://localhost:5005/api/getBooks");
      let response = await request.json(); 

      if (response.status == "ok") {
        dispatch(fetchBooksSuccess(response.data));
      } else {
        dispatch(fetchBooksFailure(response.error))
      }
    } catch(error) {
      dispatch(fetchBooksFailure(error))
    }
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
  error
});

export function addBook(book) {
  return async dispatch => {
    dispatch(addBookBegin()); 
    try {
      let body = {
        book
      };
      let request = await fetch("http://localhost:5005/api/addBook", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      let response = await request.json();

      if (response.status == "ok") {
        dispatch(addBookSuccess(response.data));
      } else {
        dispatch(addBookFailure(response.error))
      }
    } catch(error) {
      dispatch(addBookFailure(error))
    }
  }
}