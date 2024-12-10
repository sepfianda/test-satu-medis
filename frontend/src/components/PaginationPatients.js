import React, { useEffect, useState } from 'react';

const PaginationPatients = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 2
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:2000/patients?page=${page}&limit=${limit}`);
      const data = await response.json();
      setPatients(data.patients);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  const totalPages = Math.ceil(total / limit);
  return (
    <div>
      <h2>Patient List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              {patient.fullName} - {patient.email}
            </li>
          ))}
        </ul>
      )}
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginationPatients