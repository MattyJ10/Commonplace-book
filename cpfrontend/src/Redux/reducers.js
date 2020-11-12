import { ADD_CARD_BEGIN,
         ADD_CARD_SUCCESS,
         ADD_CARD_ERROR,
         DELETE_CARD_BEGIN,
         DELETE_CARD_SUCCESS,
         DELETE_CARD_ERROR,
         FETCH_CARDS_BEGIN,
         FETCH_CARDS_SUCCESS,
         FETCH_CARDS_FAILURE
} from "./actions";

let initialCardState = {
  cards: [],
  loading: false,
  error: null,
}

function cardReducer(state = initialCardState, action){
    switch(action.type) {
        case ADD_CARD_BEGIN: 
          return {
            ...state, 
            loading: true,
            error: null
          }
        case ADD_CARD_SUCCESS: 
          return {
            ...state,
            cards: [...state.cards, action.payload.card],
            loading: false,
            error: null,
          }
        case ADD_CARD_ERROR: 
          return {
            ...state, 
            loading: false,
            error: action.payload.msg,
          }
        case DELETE_CARD_BEGIN:
          return {
            ...state, 
            loading: true,
            error: null
          }
        case DELETE_CARD_SUCCESS:
          let currentList = state.cards;
          let index = currentList.findIndex(item => item._id === action.payload.id);
          let newList = [...currentList.slice(0, index), ...currentList.slice(index+1)]
          console.log(newList); 
          return {
            ...state, 
            cards: newList,
            loading: true,
            error: null
          }
        case DELETE_CARD_ERROR: 
          return {
            ...state, 
            loading: false,
            error: action.payload.msg
          }
        case FETCH_CARDS_BEGIN:
          return {
            ...state,
            loading: true,
            error: null
          };
        case FETCH_CARDS_SUCCESS:
          return {
            ...state,
            loading: false,
            cards: action.payload.cards
          };
        case FETCH_CARDS_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: []
          };
        default: 
          return state;
     }
}

export default cardReducer;