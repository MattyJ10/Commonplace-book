import { UPSERT_CARD_BEGIN,
         UPSERT_CARD_SUCCESS,
         DELETE_CARD_BEGIN,
         DELETE_CARD_SUCCESS,
         FETCH_CARDS_BEGIN,
         FETCH_CARDS_SUCCESS,
} from "../actions/cardActions";

let initialCardState = {
  cards: [],
  loading: false,
}

function cardReducer(state = initialCardState, action){
    switch(action.type) {
      case UPSERT_CARD_BEGIN: 
        return {
          ...state, 
          loading: true
        }
      case UPSERT_CARD_SUCCESS:
        if (action.payload.isEdit) {
          let updatedCard = action.payload.card
          return {
            ...state,
            cards: state.cards.map(card => card._id === updatedCard._id ? 
              updatedCard :
              card
            ),
            loading: false,
          }
        } else {
          return {
            ...state,
            cards: [...state.cards, action.payload.card],
            loading: false,
          }
        }
      case DELETE_CARD_BEGIN:
        return {
          ...state, 
          loading: true,
        }
      case DELETE_CARD_SUCCESS:
        let currentList = state.cards;
        let index = currentList.findIndex(item => item._id === action.id);
        let newList = [...currentList.slice(0, index), ...currentList.slice(index+1)]
        return {
          ...state, 
          cards: newList,
          loading: true,
        }
      case FETCH_CARDS_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CARDS_SUCCESS:
        return {
          ...state,
          loading: false,
          cards: action.payload.cards,
        };
      default: 
        return state;
     }
}

export default cardReducer;