import './App.css';
import {Quote} from './Quote'
import {useSelector, useDispatch} from 'react-redux';
import {loadAuthor, loadAll} from './actions'
import {useEffect} from 'react';


function App() {

  const quotes = useSelector(state => state.quotes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAll());
  }, [dispatch]);


  return (
    <div className="App">
      {quotes.map(quotes => <Quote key={quotes.id} quote = {quotes}/>)}
    </div>
  );
}

export default App;
