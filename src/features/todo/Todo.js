import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TodoAdd from "./TodoAdd";
import TodoFilterButtons from "./TodoFilterButtons";
import TodoList from "./TodoList";
import { getTodos } from "./todoSlice";

function Todo() {
  const dispatch = useDispatch();
  // const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div>
      {/* <span>{error}</span> */}
      <TodoAdd />
      <TodoFilterButtons />
      <TodoList />
    </div>
  );
}

export default Todo;
