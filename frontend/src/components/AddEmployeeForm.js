import React, { useState } from "react";
import API from "../services/api";

function AddEmployeeForm({ refreshEmployees }) {

  const [employee_id, setEmployeeId] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {

    e.preventDefault();

    setError(null);
    setSuccess(null);

    API.post("/employees/", {
      employee_id,
      full_name,
      email,
      department
    })
    .then((res) => {

      console.log("Employee created:", res.data);

      setEmployeeId("");
      setFullName("");
      setEmail("");
      setDepartment("");

      setSuccess("Employee added successfully");

      refreshEmployees();

    })
    .catch((err) => {

      console.log(err.response?.data);

      const message =
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        "Failed to add employee";

      setError(message);

    });

  };

  return (

    <form onSubmit={handleSubmit} className="card">

      <h3>Add Employee</h3>

      {error && <p style={{color:"red"}}>{error}</p>}
      {success && <p style={{color:"green"}}>{success}</p>}

      <input
        placeholder="Employee ID"
        value={employee_id}
        onChange={(e)=>setEmployeeId(e.target.value)}
        required
      />

      <input
        placeholder="Full Name"
        value={full_name}
        onChange={(e)=>setFullName(e.target.value)}
        required
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Department"
        value={department}
        onChange={(e)=>setDepartment(e.target.value)}
        required
      />

      <button className="primary-btn" type="submit">Add Employee</button>

    </form>
  );
}

export default AddEmployeeForm;