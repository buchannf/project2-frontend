import './App.css';
import {Quote} from './Quote'
import {useSelector, useDispatch} from 'react-redux';
import {loadAll, startAddingQuote} from './actions'
import {useEffect} from 'react';
import { ProgressBar } from 'react-fetch-progressbar';


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
        <h1>&#129303;Happy Thoughts!&#129303;</h1>
      </header>
      <div id='quote-view'>
        <ProgressBar />
        {quotes.slice(0).reverse().map(quote => <Quote key={quote.id} quote = {quote}/>)}
      </div>
      <button onClick={onAdd} className='add-button'>Add Some Happiness</button>
    </div>
  );
}

export default App;
