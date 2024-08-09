import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useSelector } from "react-redux";
import {
  API_URL,
  fetchPatientData,
  showModalAdd,
} from "./features/patientsList/patientsListSlice";
import PatientsList from "./pages/PatientsList";
import Modal from "./sections/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { fetching } = useSelector((state: RootState) => state.patientsList);

  //Fetches all the patients
  useEffect(() => {
    dispatch(fetchPatientData(API_URL));
  }, [dispatch]);

  return (
    <div className="container">
      <ToastContainer />
      <header>
        <h1 className="title">Medical Services</h1>
        <hr />
      </header>
      <section>
        <div className="sectionHeader">
          <h2>List of Patients</h2>
          <button className="addBtn" onClick={handleShowModalAdd}>
            Add Patient
          </button>
        </div>
        {fetching ? (
          getLoader()
        ) : (
          <div className="cardsWrapper">
            <PatientsList />
          </div>
        )}
        {/* TODO: Si se puede hacer pantalla de error mejor
          EL TAL JHON DOE OJITO CON VALIDACIONES 
          No se llego a estos TODOs y otras cosas, lo siento*/}
        <Modal />
      </section>
    </div>
  );

  function getLoader() {
    return (
      <div className="loaderContainer">
        <div className="loader" />
      </div>
    );
  }

  function handleShowModalAdd() {
    dispatch(showModalAdd());
  }
}

export default Home;
