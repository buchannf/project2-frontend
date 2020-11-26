import React from 'react';

export function Quote(props) {
    const quote = props.quote;
    return (
        <div className="quote">
            <p>{quote.message}</p>
            <p>-{quote.author}</p>
        </div>
    );
}