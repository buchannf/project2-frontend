export const Action = Object.freeze({
    LoadQuotes: 'LoadQuotes',
});

export function loadQuotes(quotes) {
    return {
        type: Action.LoadQuotes,
        payload: quotes,
    };
}

function checkForErrors(response) {
    if(!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

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