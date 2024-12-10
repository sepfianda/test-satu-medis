import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const PaginationPatient = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:2000/pagination`, {
        params: { page, limit, search },
      });
      setPatients(response.data.patients);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="columns mt-5 is-centered">
      <form>
        <div class="field">
          <h2 class="title is-2 has-text-centered">Patients List</h2>
          <div class="control">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
            <select value={limit} onChange={handleLimitChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Diagnosis</th>
              <th>Doctor Name</th>
              <th>Poli Clinic</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.fullName}</td>
                <td>{patient.phoneNumber}</td>
                <td>{patient.address}</td>
                <td>{patient.diagnosis}</td>
                <td>{patient.doctorName}</td>
                <td>{patient.poliClinic}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            {" "}
            Page {page} of {totalPages}{" "}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaginationPatient;
