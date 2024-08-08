import { configureStore } from "@reduxjs/toolkit";
import patientsListReducer from "./features/patientsList/patientsListSlice";

export const store = configureStore({
  reducer: {
    patientsList: patientsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
