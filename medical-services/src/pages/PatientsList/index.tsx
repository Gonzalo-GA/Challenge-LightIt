import React, { ReactNode } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  showDetails,
  showModalEdit,
  Patient,
} from "../../features/patientsList/patientsListSlice";

function PatientsList() {
  const dispatch: AppDispatch = useDispatch();
  const { patientsList } = useSelector(
    (state: RootState) => state.patientsList
  );

  return (
    <React.Fragment>
      {patientsList.map((patient: Patient) => {
        return (
          <div
            className={`patientCard ${
              patient.showDetails ? "showingDetails" : ""
            }`}
            key={patient.id}
          >
            <button
              className="btnIcon"
              onClick={() => handleShowModalEdit(patient.id)}
            >
              <img className="edit" src="/edit.png" alt="edit" />
            </button>
            <div className="patientData">
              <div className="patientShortData">
                <img className="avatar" src={patient.avatar} alt="avatar" />
                {getData("Name", patient.name, false)}
                {getData("Creation Date", formatDate(patient.createdAt), false)}
              </div>
              {patient.showDetails && (
                <div className="patientDetails">
                  <div className="description">
                    {getData("Description", patient.description, true)}
                  </div>
                  <div>{getData("Website", patient.website, true)}</div>
                </div>
              )}
            </div>
            <div className="patientInteractives">
              <button
                className="btnIcon"
                onClick={() => handleShowDetails(patient.id)}
              >
                <img
                  className={`chevron ${
                    patient.showDetails ? "showingDetails" : ""
                  }`}
                  src="/chevron.png"
                  alt="chevron"
                />
              </button>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );

  function getData(label: string, data: string, isDetails: boolean): ReactNode {
    return (
      <div className={isDetails ? "details" : undefined}>
        <p className="label">{label}:</p>
        <p className="data">{data}</p>
      </div>
    );
  }

  function handleShowDetails(patientId: number) {
    dispatch(showDetails(patientId));
  }

  function handleShowModalEdit(patientId: number) {
    dispatch(showModalEdit(patientId));
  }

  function formatDate(isoDateString: string): string {
    try {
      const date = new Date(isoDateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formatter.format(date);
    } catch (error) {
      return "Error formatting date";
    }
  }
}

export default PatientsList;
