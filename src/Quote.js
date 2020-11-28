import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingQuote, startDeletingQuote} from './actions'

export function Quote(props) {
    const quote = props.quote;
    const dispatch = useDispatch();
    const [author, setAuthor] = useState(quote.author);
    const [message, setMessage] = useState(quote.message);

    const onEdit = () => {
        dispatch(enterEditMode(quote));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(quote));
    }

    const onSave = () => {
        dispatch(startSavingQuote({
            id: quote.id,
            author,
            message,
        }));
    }

    const onDelete = () => {
        dispatch(startDeletingQuote(quote))
    }

    if(quote.isEditing) {
        return (
            <div className="quote">
            <textarea value={message} onChange = { e => setMessage(e.target.value)}/>
            <input type='text' value={author} onChange = { e => setAuthor(e.target.value)}/>
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel} >Cancel</button>
            <button onClick={onDelete}>Delete</button>
        </div>
        );
    }
    return (
        <div className="quote">
            <p>{quote.message}</p>
            <p>-{quote.author}</p>
            <button onClick={onEdit}>Edit</button>
        </div>
    );
}