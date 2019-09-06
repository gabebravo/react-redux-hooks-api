import { createAction, handleActions } from 'redux-actions';

const defaultState = {
  todos: [
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false
    }
  ]
};

// ACTIONS
export const setTodos = createAction('SET_TODOS');
export const addTodo = createAction('ADD_TODO');
export const deleteTodo = createAction('DELETE_TODO');

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
      todos: [...state.todos, payload]
    }),
    [deleteTodo]: (state, { payload }) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== payload.id)
    })
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
        console.log('data', data);
        // const [user] = data;
        // const transformedUser = transformUser(user);
        // dispatch(setUserData({ data: transformedUser }));
      }
    })
    .catch(err => console.log('error', err));
};
