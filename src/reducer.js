import { Action } from "./actions";
const initialState = {
    isLoading: false,
    quotes: []
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case Action.LoadQuotes:
            return {
                ...state,
                quotes: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;