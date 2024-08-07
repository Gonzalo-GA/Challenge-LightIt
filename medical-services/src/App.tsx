import React from "react";
import "./App.css";

function Home() {
  return (
    <div className="container">
      <header>
        <h1 className="title">Medical Services</h1>
        <hr />
      </header>
      <section>
        <h3>Patients</h3>
        <div className="patientCard">
          <div className="patientData">
            <img src="" alt="avatar" />
            <p>Gonzalo Aquino</p>
            <div>
              <p>Creation Date:</p>
              <p>July 13, 1999</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
