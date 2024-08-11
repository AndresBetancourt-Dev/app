import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/store/reducers/tasks";
import authReducer from "@/store/reducers/auth";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
