import { progressBarFetch, setOriginalFetch } from 'react-fetch-progressbar';
setOriginalFetch(window.fetch);
window.fetch = progressBarFetch;

export const Action = Object.freeze({
    LoadQuotes: 'LoadQuotes',
    FinishAddingQuote: 'FinishAddingQuote',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingQuote: 'FinishSavingQuote',
    FinishDeletingQuote: 'FinishDeletingQuote',
});

export function loadQuotes(quotes) {
    return {
        type: Action.LoadQuotes,
        payload: quotes,
    };
}

export function finishAddingQuote(quote) {
    return {
        type: Action.FinishAddingQuote,
        payload: quote,
    };
}

export function finishSavingQuote(quote) {
    return {
        type: Action.FinishSavingQuote,
        payload: quote,
    };
}

export function finishDeletingQuote(quote) {
    return {
        type: Action.FinishDeletingQuote,
        payload: quote,
    };
}

export function enterEditMode(quote) {
    return {
        type: Action.EnterEditMode,
        payload: quote,
    };
}

export function leaveEditMode(quote) {
    return {
        type: Action.LeaveEditMode,
        payload: quote,
    };
}

function checkForErrors(response) {
    if(!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}


//Fetch calls to api (GET, POST, PATCH, DELETE)


const host = 'https://quote-api.buchannf.me:8443';

export function loadAuthor(author) {
    return dispatch => {
        fetch (`${host}/quotes/${author}`)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            if(data.ok) {
                dispatch(loadQuotes(data.quotes));
            }
        })
        .catch(e => console.error(e));
    }
}

export function loadAll() {
    return dispatch => {
        fetch (`${host}/quotes`)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            if(data.ok) {
                dispatch(loadQuotes(data.quotes));
            }
        })
        .catch(e => console.error(e));
    }
}

export function startAddingQuote() {
    const quote = {
        author: 'BY YOU', message: 'NEW QUOTE'
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
    };
    return dispatch => {
        fetch (`${host}/quotes`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            if(data.ok) {
                console.log(quote);
                quote.id = data.id;
                //try and fix bad ID
                document.location.reload();
                console.log(quote.id);
                dispatch(finishAddingQuote(quote));
            }
        })
        .catch(e => console.error(e));
    }
}

export function startSavingQuote(quote) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
    };
    return dispatch => {
        fetch (`${host}/quotes/${quote.id}`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.ok) {
                dispatch(finishSavingQuote(quote));
            }
        })
        .catch(e => console.error(e));
    }
}

export function startDeletingQuote(quote) {
    const options = {
        method: 'DELETE',
    };
    return dispatch => {
        fetch (`${host}/quotes/${quote.id}`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            if(data.ok) {
                dispatch(finishDeletingQuote(quote));
            }
        })
        .catch(e => console.error(e));
    }
}