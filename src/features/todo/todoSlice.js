import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  todos: [],
  filter: "SHOW_ALL",
  status: "idle",
  error: "error",
};

// let nextTodoId = 0; json server co chuc nang quan ly Id nen khong can gui id ve
export const addTodo = createAsyncThunk("counter/addTodo", async (text) => {
  // const todo = { id: nextTodoId++, text: text, completed: false };
  const todo = { text: text, completed: false };
  const res = await apiService.post("/todos", todo);
  return res.data;
});

export const getTodos = createAsyncThunk("counter/getTodo", async () => {
  // const todo = { id: nextTodoId++, text: text, completed: false };
  const res = await apiService.get("/todos");
  return res.data;
});

export const toggleTodo = createAsyncThunk(
  "counter/toggleTodo",
  async (action) => {
    const todo = (await apiService.get(`/todos/${action.id}`)).data;
    const res = await apiService.put(`/todos/${action.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    return res.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // addTodo: (state, action) => {
    //   // state.todos.push({
    //   //   id: nextTodoId++,
    //   //   name: action.payload.text,
    //   //   completed: false,
    //   // });
    // },
    // toggleTodo: (state, action) => {
    //   //Nho gan state cu thanh state moi neu khong no se khong apply
    //   state.todos = state.todos.map((todo) => {
    //     console.log(todo.completed);
    //     if (todo.id === action.payload.id)
    //       return { ...todo, completed: !todo.completed };
    //     return todo;
    //   });
    // },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = action.error.message;
      });

    builder
      .addCase(toggleTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action);
        // state.todos = action.payload;
        state.todos = state.todos.map((todo) => {
          console.log(todo.completed);
          if (todo.id === action.payload.id)
            return { ...todo, completed: !todo.completed };
          return todo;
        });
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = action.error.message;
      });
  },
});

// export const { addTodo, toggleTodo, setFilter } = todoSlice.actions;
export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;
