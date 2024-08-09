import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const API_URL = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";

export const URL_VALIDATION_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

//Patient Data Interface
export interface Patient {
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
  id: number;
  showDetails: boolean;
}

//Modal Form Values Interface
export interface FormValues {
  name: string;
  avatar: File | null;
  description: string;
  website: string;
}

//State
interface PatientsListState {
  patientsList: Patient[];
  patientToEdit?: Patient;
  fetching: boolean;
  error?: string;
  showModalEdit: boolean;
  showModalAdd: boolean;
}

//Initial State
const initialState: PatientsListState = {
  patientsList: [],
  patientToEdit: undefined,
  fetching: false,
  error: undefined,
  showModalEdit: false,
  showModalAdd: false,
};

// It fetches the patients data
export const fetchPatientData = createAsyncThunk(
  "patientsList/fetchPatientData",
  async (endpoint: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Patients List Slice
const patientsListSlice = createSlice({
  name: "patientsList",
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patientsList.push(action.payload);
    },
    closeModals: (state) => {
      state.showModalAdd = false;
      state.showModalEdit = false;
    },
    editPatient: (state, action: PayloadAction<Patient>) => {
      const patientIndex = state.patientsList.findIndex(
        (patient) => patient.id === action.payload.id
      );
      if (patientIndex !== -1)
        state.patientsList[patientIndex] = action.payload;
    },
    showModalEdit: (state, action: PayloadAction<number>) => {
      state.showModalEdit = true;
      const patient = state.patientsList.find(
        (patient) => patient.id === action.payload
      );
      if (patient) state.patientToEdit = patient;
    },
    showModalAdd: (state) => {
      state.showModalAdd = true;
    },
    showDetails: (state, action: PayloadAction<number>) => {
      const patient = state.patientsList.find(
        (patient) => patient.id === action.payload
      );
      if (patient) patient.showDetails = !patient.showDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientData.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchPatientData.fulfilled, (state, action) => {
        state.fetching = false;
        const patientPayload = action.payload.map((patient: any) => ({
          ...patient,
          showDetails: false,
        }));
        state.patientsList = patientPayload;
      })
      .addCase(fetchPatientData.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addPatient,
  closeModals,
  editPatient,
  showModalEdit,
  showModalAdd,
  showDetails,
} = patientsListSlice.actions;
export default patientsListSlice.reducer;
