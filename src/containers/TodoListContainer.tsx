import { connect } from 'react-redux';

import { deleteTodo, getTodosIfNeeded, updateTodo } from '../actions';
import { IStateTree, ITodo, Status  } from '../models';

import DropTargetList from '../components/DropTargetList';

interface ITodoListContainerProps {
    status: Status;
    title: string;
}

const mapStateToProps = (state: IStateTree, props: ITodoListContainerProps) => {
    return {
        isFetching: state.todos.isFetching,
        status: props.status,
        title: props.title,
        todos: state.todos.items.filter(todo => todo.status === props.status),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDelete: (id: number) => {
            dispatch(deleteTodo(id));
        },
        onInit: () => {
            dispatch(getTodosIfNeeded());
        },
        onUpdate: (todo: ITodo) => {
            dispatch(updateTodo(todo));
        },
    };
};

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropTargetList);

export default TodoListContainer;