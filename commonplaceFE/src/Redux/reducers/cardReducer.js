import { UPSERT_CARD_SUCCESS,
         DELETE_CARD_SUCCESS,
         FETCH_CARDS_SUCCESS,
} from "../actions/cardActions";

let initialCardState = {
  cards: [],
}

function cardReducer(state = initialCardState, action){
    switch(action.type) {
      case UPSERT_CARD_SUCCESS:
        if (action.payload.isEdit) {
          let updatedCard = action.payload.card
          return {
            ...state,
            cards: state.cards.map(card => card._id === updatedCard._id ? 
              updatedCard :
              card
            ),
          }
        } else {
          return {
            ...state,
            cards: [...state.cards, action.payload.card],
          }
        }
      case DELETE_CARD_SUCCESS:
        let currentList = state.cards;
        let index = currentList.findIndex(item => item._id === action.id);
        let newList = [...currentList.slice(0, index), ...currentList.slice(index+1)]
        return {
          ...state, 
          cards: newList,
        }
      case FETCH_CARDS_SUCCESS:
        return {
          ...state,
          cards: action.payload.cards,
        };
      default: 
        return state;
     }
}

export default cardReducer;