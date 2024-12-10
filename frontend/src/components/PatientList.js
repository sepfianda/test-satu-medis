import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatient] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    const response = await axios.get("http://localhost:2000/patients");
    setPatient(response.data);
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/patients/${id}`);
      getPatients();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div>
      <Link to={`addPatient`} className="button is-success">
          Add New
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Diagnosis</th>
              <th>Doctor Name</th>
              <th>Poli Clinic</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{patient.fullName}</td>
                <td>{patient.phoneNumber}</td>
                <td>{patient.address}</td>
                <td>{patient.diagnosis}</td>
                <td>{patient.doctorName}</td>
                <td>{patient.poliClinic}</td>
                <td>
                  <Link to={`editPatient/${patient.id}`} className="button is-small is-info">Edit</Link>
                  <button onClick={() => deletePatient(patient.id)} className="button is-small is-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
