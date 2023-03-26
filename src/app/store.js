import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import multiCounterReducer from "../features/multiCounter/multiCounterSlice";
import todoSliceReducer from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    multiCounter: multiCounterReducer,
    todos: todoSliceReducer,
  }),
});
