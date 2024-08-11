import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FirestoreService } from "@/services";
import { Task } from "@/types";
import { RootState } from "@/store";

const firestoreService = new FirestoreService("tasks");

interface TasksState {
  tasks: (Task & { id: string })[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState }) => {
    const { user } = (getState() as RootState).auth;
    console.log(user);
    if (!user) {
      throw new Error("User not authenticated");
    }
    return await firestoreService.getAllTasks(user.uid);
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: Task, { getState }) => {
    const { user } = (getState() as RootState).auth;
    if (!user) {
      throw new Error("User not authenticated");
    }
    const id = await firestoreService.createTask(user.uid, data);
    return { id, ...data };
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }: { id: string; data: Partial<Task> }, { getState }) => {
    const { user } = (getState() as RootState).auth;
    if (!user) {
      throw new Error("User not authenticated");
    }
    await firestoreService.updateTask(user.uid, id, data);
    return { id, data };
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { getState }) => {
    const { user } = (getState() as RootState).auth;
    if (!user) {
      throw new Error("User not authenticated");
    }
    await firestoreService.deleteTask(user.uid, id);
    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<(Task & { id: string })[]>) => {
          state.status = "succeeded";
          state.tasks = action.payload;
        }
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(
        createTask.fulfilled,
        (state, action: PayloadAction<Task & { id: string }>) => {
          state.tasks.push(action.payload);
        }
      )
      .addCase(
        updateTask.fulfilled,
        (state, action: PayloadAction<{ id: string; data: Partial<Task> }>) => {
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          if (index !== -1) {
            state.tasks[index] = {
              ...state.tasks[index],
              ...action.payload.data,
            };
          }
        }
      )
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
