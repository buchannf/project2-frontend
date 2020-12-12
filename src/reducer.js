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
                isLoading: true,
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
                isLoading: true,
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
                isLoading: true,
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
                isLoading: true,
                quotes: state.quotes.filter(quote => quote.id !== action.payload.id)
            };
        case Action.FinishAddingQuote:
            return {
                ...state,
                isLoading: true,
                //quotes: [{...action.payload, isEditing: true,}, ...state.quotes],
                quotes: [...action.payload, ...state.quotes],
            };
        default:
            return state;
    }
}
export default reducer;