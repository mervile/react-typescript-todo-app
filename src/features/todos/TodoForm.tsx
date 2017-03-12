import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { IStateTree } from '../../models';
import { isAddingTodo, requestAddTodo } from './duck';

interface ITodoFormProps {
    isLoading: boolean;
    locale: string;
    onSubmit(event: any, value: string): void;
}
interface ITodoFormState { value: string; }

class TodoFormComponent extends React.Component<ITodoFormProps, ITodoFormState> {

    constructor() {
        super();

        this.state = {
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitTodo = this.submitTodo.bind(this);
    }

    public render() {
        return (
            <form className='todoForm'>
                <TextField
                    type='text'
                    hintText={I18n.t('todos.addNew')}
                    onChange={this.handleChange}
                />
                <RaisedButton
                    type='submit'
                    style={{margin:'10px'}}
                    onClick={this.submitTodo}
                    label={this.props.isLoading ? I18n.t('todos.adding') : I18n.t('todos.submit')}
                    disabled={this.props.isLoading ? true : false}
                />
            </form>
        );
    }

    protected submitTodo(event: any) {
        this.props.onSubmit(event, this.state.value);
    }

    protected handleChange(event: any) {
        this.setState({ value: event.target.value });
    }
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isLoading: isAddingTodo(state),
        locale: state.i18n.locale,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (event: any, value: string) => {
            event.preventDefault();
            dispatch(requestAddTodo(value));
        },
    };
};

const TodoForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoFormComponent);

export default TodoForm;
