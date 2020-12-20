import { 
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  ADD_BOOK_BEGIN,
  ADD_BOOK_SUCCESS,
} from "../actions/bookActions";

let initialBookState = {
  books: [],
  loading: false
}

function bookReducer(state = initialBookState, action) {
  switch(action.type) {
    case FETCH_BOOKS_BEGIN:
      return {
        ...state, 
        loading: true
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books
      };
    case ADD_BOOK_BEGIN:
      return {
        ...state,
        loading: true
      }
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload.book],
        loading: false
      }
    default:
      return state;
  }
}

export default bookReducer;