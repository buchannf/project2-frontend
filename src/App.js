import './App.css';
import {Quote} from './Quote'
import {useSelector, useDispatch} from 'react-redux';
import {loadAll, startAddingQuote} from './actions'
import {useEffect} from 'react';


function App() {

  const quotes = useSelector(state => state.quotes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAll());
  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingQuote());
  }

  return (
    <div className="App">
      <header>
        <h1>Happy Thoughts!</h1>
        <button onClick={onAdd} className='add-button'>Add Some Happiness</button>
      </header>
      {quotes.map(quote => <Quote key={quote.id} quote = {quote}/>)}
    </div>
  );
}

export default App;
