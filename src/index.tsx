import * as React from "react";
import * as ReactDOM from "react-dom";

import { TodoItemList } from "./components/TodoItemList";

// Important that this is after all!
import "../main.scss";

ReactDOM.render(
    <div><TodoItemList /></div>,
    document.getElementById("example")
);
