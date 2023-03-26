import React from "react";
import { setFilter } from "./todoSlice";
import { useDispatch } from "react-redux";

function TodoFilterButtons() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(setFilter("SHOW_ALL"))}>Show All</button>
      <button onClick={() => dispatch(setFilter("SHOW_COMPLETED"))}>
        Show Completed
      </button>
      <button onClick={() => dispatch(setFilter("SHOW_ACTIVE"))}>
        Show Active
      </button>
    </div>
  );
}

export default TodoFilterButtons;
