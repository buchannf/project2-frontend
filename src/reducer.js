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
            };
        case Action.EnterEditMode:
            return {
                ...state,
                quotes: state.quotes.map(quote => {
                    if(quote.id === action.payload.id) {
                        return {...quote, isEditing: true};
                    } else {
                        return quote;
                    }
                }),
            };
        case Action.LeaveEditMode:
            return {
                ...state,
                quotes: state.quotes.map(quote => {
                    if(quote.id === action.payload.id) {
                        return {...quote, isEditing: false};
                    } else {
                        return quote;
                    }
                }),
            };
        case Action.FinishSavingQuote:
            return {
                ...state,
                quotes: state.quotes.map(quote => {
                    if(quote.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return quote;
                    }
                }),
            };
        case Action.FinishDeletingQuote:
            return {
                ...state,
                quotes: state.quotes.filter(quote => quote.id !== action.payload.id)
            };
        case Action.FinishAddingQuote:
            return {
                ...state,
                quotes: [{...action.payload, isEditing: true,}, ...state.quotes],
            };
        default:
            return state;
    }
}

export default reducer;