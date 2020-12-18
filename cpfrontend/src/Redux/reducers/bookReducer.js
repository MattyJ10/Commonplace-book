import { 
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  ADD_BOOK_BEGIN,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE
} from "../actions/bookActions";

let initialBookState = {
  books: [],
  loading: false,
  error: null
}

function bookReducer(state = initialBookState, action) {
  switch(action.type) {
    case FETCH_BOOKS_BEGIN:
      return {
        ...state, 
        loading: true,
        error: null
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        books: []
      }
    case ADD_BOOK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload.book.book],
        loading: false,
        error: null
      }
    case ADD_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.msg
      }
    default:
      return state;
  }
}

export default bookReducer;