import _ from 'lodash';
import { genTodoId } from '../component/util';

/**
 * 生成初始化 state
 */
const initialTodos = [];
for (let i = 0; i < 2000; i++) {
    initialTodos.push({
        text: `测试${_.padStart(i, 3, '0')}`,
        complete: false,
        id: genTodoId(),
        date: new Date()
    });
}
const initialState = {
    todos: initialTodos,
    visibilityFilter: 'SHOW_ALL' // SHOW_ALL、SHOW_COMPLETED、SHOW_ACTIVE
};

export default function TodoReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return addTodo(state, action);
        case 'TOGGLE_TODO_COMPLETE_STATE':
            return toggleTodoCompleteState(state, action);
        case 'SET_VISIBILITY_FILTER':
            return setVisibilityFilter(state, action);
        default:
            return state;
    }
}

function addTodo(state, { payload }) {
    const { text, complete, id, date } = payload;

    return {
        ...state,
        todos: [
            ...state.todos,
            {
                text,
                complete,
                id,
                date
            }
        ]
    };
}

function toggleTodoCompleteState(state, { payload }) {
    const todoId = payload;
    return {
        ...state,
        todos: state.todos.map(
            (todo) =>
                todo.id == todoId
                    ? {
                          ...todo,
                          complete: !todo.complete
                      }
                    : todo
        )
    };
}

function setVisibilityFilter(state, { payload }) {
    return {
        ...state,
        visibilityFilter: payload
    };
}
