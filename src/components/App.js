import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  markComplete
} from '../redux/reducers';
import './App.css';

function App() {
  const [input, setInput] = React.useState('');
  const dispatch = useDispatch();
  const todos = useSelector(store => store.todos.todos);

  React.useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const renderTodos = () =>
    todos.map(({ id, title, completed }) => (
      <div
        key={id}
        style={{
          border: '1px solid',
          padding: '1rem',
          margin: '1rem',
          background: completed && 'lightgray'
        }}
      >
        <p>{title}</p>
        <p>{`completed : ${completed}`}</p>
        <button onClick={() => dispatch(deleteTodo({ id }))}>DELETE</button>
        <button onClick={() => dispatch(markComplete({ id }))}>COMPLETE</button>
      </div>
    ));

  const addNewTodo = () => {
    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <input value={input} onChange={ev => setInput(ev.target.value)} />
      <button onClick={addNewTodo}>ADD</button>
      {todos.length > 0 && renderTodos()}
    </div>
  );
}

export default App;
