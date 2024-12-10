import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PatientList from "./components/PatientList";
import AddPatients from "./components/AddPatients";
import EditPatient from "./components/EditPatient";
import PaginationPatients from "./components/PaginationPatients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/patientList" element={<PatientList/>}/>
        <Route path="addPatient" element={<AddPatients/>}/>
        <Route path="editPatient/:id" element={<EditPatient/>}/>
        <Route path="paginationPatient" element={<PaginationPatients/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
