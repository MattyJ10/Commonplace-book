import { 
  FETCH_BOOKS_SUCCESS,
  ADD_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
} from "../actions/bookActions";

let initialBookState = {
  books: []
}

function bookReducer(state = initialBookState, action) {
  switch(action.type) {
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload.books
      };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload.book],
      }
    case DELETE_BOOK_SUCCESS:
      let currentList = state.books;
      let index = currentList.findIndex(item => item._id === action.id); 
      let newList = [...currentList.slice(0, index), ...currentList.slice(index+1)]
      return {
        ...state,
        books: newList
      }
    default:
      return state;
  }
}

export default bookReducer;