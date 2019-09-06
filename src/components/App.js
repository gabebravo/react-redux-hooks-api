import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from '../redux/reducers';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(store => store.todos.todos);

  const renderTodos = () =>
    todos.map(({ id, title, completed }) => (
      <div key={id}>
        <p>{title}</p>
        <p>{`status : ${completed}`}</p>
        <button
          onClick={() =>
            dispatch(addTodo({ id: 5, title: 'test', completed: false }))
          }
        >
          ADD
        </button>
        <button onClick={() => dispatch(deleteTodo({ id }))}>DELETE</button>
      </div>
    ));

  return (
    <div className="App">
      <h1>Todos</h1>
      {todos.length > 0 && renderTodos()}
    </div>
  );
}

export default App;
