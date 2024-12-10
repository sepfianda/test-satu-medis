import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPatient = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [poliClinic, setPoliClinic] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPatientById();
  });

  const updatePatient = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:2000/patients/${id}`, {
        fullName,
        phoneNumber,
        address,
        diagnosis,
        doctorName,
        poliClinic,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getPatientById = async () => {
    const response = await axios.get(`http://localhost:2000/patients/${id}`);
    setFullName(response.data.fullName);
    setPhoneNumber(response.data.phoneNumber);
    setAddress(response.data.address);
    setDiagnosis(response.data.diagnosis);
    setDoctorName(response.data.doctorName);
    setPoliClinic(response.data.poliClinic);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updatePatient}>
          <div className="field">
            <label className="label">Full Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Address</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Diagnosis</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Diagnosis"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Doctor Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Doctor Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Poli Clinic</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={poliClinic}
                onChange={(e) => setPoliClinic(e.target.value)}
                placeholder="Poli Clinic"
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
