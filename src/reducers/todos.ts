import {
    ADD_TODO,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    DELETE_TODO,
    RECEIVE_TODOS,
    REQUEST_TODOS,
    REQUEST_TODOS_FAILURE,
    UPDATE_TODO,
} from '../actions';
import { ITodosState } from '../models';

const initialState: ITodosState = {
    didInvalidate: true,
    error: null,
    isFetching: false,
    items: [],
    lastUpdated: Date.now(),
};

function todos(state = initialState, action: any) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                isFetching: true,
                items: state.items,
                lastUpdated: state.lastUpdated,
            });
        case ADD_TODO_SUCCESS:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                isFetching: false,
                items: [...state.items, action.todo],
                lastUpdated: Date.now(),
            });
        case ADD_TODO_FAILURE:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: { error: action.error, type: action.type },
                isFetching: false,
                items: state.items,
                lastUpdated: state.lastUpdated,
            });
        case REQUEST_TODOS:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                isFetching: true,
                items: state.items,
                lastUpdated: state.lastUpdated,
            });
        case REQUEST_TODOS_FAILURE:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: { error: action.error, type: action.type },
                isFetching: false,
                items: state.items,
                lastUpdated: state.lastUpdated,
            });
        case RECEIVE_TODOS:
            return Object.assign({}, state, {
                didInvalidate: true,
                error: null,
                isFetching: false,
                items: action.todos,
                lastUpdated: Date.now(),
            });
        case UPDATE_TODO:
        case DELETE_TODO:
        default:
            return state;
    }
}

export default todos;
