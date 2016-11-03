import * as React from "react";

import { ITodoItem, Status } from "../models";

import "./TodoItem.scss";

export interface ITodoItemProps { item: ITodoItem; onStatusUpdate: any; }

export class TodoItem extends React.Component<ITodoItemProps, {}> {
    public render() {
        return (
            <div className="todoItem">
                <span className="description">{ this.props.item.description }</span>
                <select
                    value={this.props.item.status}
                    onChange={this.props.onStatusUpdate}>
                    <option value={Status.New}>New</option>
                    <option value={Status.InProgress}>In progress</option>
                    <option value={Status.Done}>Done</option>
                </select>
            </div>
        );
    }
}
