import { createAction, handleActions } from 'redux-actions';

const defaultState = {
  todos: []
};

const buildNewTodo = title => {
  const uniqueId = Math.floor(Math.random() * 10) + 1;
  return {
    userId: uniqueId,
    id: uniqueId,
    title,
    completed: false
  };
};

// ACTIONS
export const setTodos = createAction('SET_TODOS');
export const addTodo = createAction('ADD_TODO');
export const deleteTodo = createAction('DELETE_TODO');
export const markComplete = createAction('MARK_COMPLETE');

// REDUCERS
export default handleActions(
  {
    // TODO
    [setTodos]: (state, { payload }) => ({
      ...state.todos,
      todos: payload
    }),
    [addTodo]: (state, { payload }) => ({
      ...state,
      todos: [...state.todos, buildNewTodo(payload)]
    }),
    [deleteTodo]: (state, { payload }) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== payload.id)
    }),
    [markComplete]: (state, { payload }) => {
      const mappedTodos = state.todos.map(todo =>
        todo.id === payload.id ? { ...todo, completed: true } : todo
      );
      return {
        ...state,
        todos: mappedTodos
      };
    }
  },
  defaultState
);

// DUCKS/THUNKS
const url = 'https://jsonplaceholder.typicode.com/todos';
export const fetchTodos = () => (dispatch, getState) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const tenTodos = data.slice(0, 3);
        dispatch(setTodos(tenTodos));
      }
    })
    .catch(err => console.log('error', err));
};
