import { 
  fetchBooksBegin, 
  fetchBooksSuccess, 
  fetchBooksFailure, 
  addBookBegin,
  addBookSuccess,
  addBookFailure,
} from '../Redux/actions/bookActions';
import { setError } from '../Redux/actions/messageActions';
import { fetchWithTimeout } from './apiUtils'; 

export function fetchBooks() {
  return async dispatch => {
    dispatch(fetchBooksBegin());
    try {
      let request = await fetchWithTimeout("http://localhost:5005/api/getBooks", {timeout: 10000});
      let response = await request.json(); 

      if (response.status == "ok") {
        dispatch(fetchBooksSuccess(response.data));
      } else {
        dispatch(fetchBooksFailure(response.error))
      }
    } catch(error) {
      if (error.name === 'AbortError') {
        dispatch(setError("Timeout occurred grabbing books, try again later"))
      } else {
        dispatch(fetchBooksFailure(error))
      }
      throw error
    }
  }
}

export function addBook(book) {
  return async dispatch => {
    dispatch(addBookBegin()); 
    try {
      let body = {
        book
      };
      let request = await fetchWithTimeout("http://localhost:5005/api/addBook", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        timeout: 10000
      })
      let response = await request.json();

      if (response.status == "ok") {
        dispatch(addBookSuccess(response.data, response.message));
      } else {
        dispatch(addBookFailure(response.error))
      }
    } catch(error) {
      if (error.name === 'AbortError') {
        dispatch(setError("Timeout occurred adding book, try again later"))
      } else {
        dispatch(addBookFailure(error))
      }
      throw error; 
    }
  }
}