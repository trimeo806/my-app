import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "./todoSlice";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter((todos) => todos.completed);
    case "SHOW_ACTIVE":
      return todos.filter((todos) => !todos.completed);
    default:
      return todos;
  }
};

function TodoList() {
  const { todos, filter } = useSelector((state) => state.todos);
  const filteredTodos = getVisibleTodos(todos, filter);
  const dispatch = useDispatch();

  return (
    <ul>
      {filteredTodos?.map((todo) => (
        <li
          key={todo.id}
          onClick={() => dispatch(toggleTodo({ id: todo.id }))}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
