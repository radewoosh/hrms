

import React, { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeForm from "../components/AddEmployeeForm";

function EmployeesPage() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);

  const fetchEmployees = () => {

    setLoading(true);

    API.get("/employees/")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch employees");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (

    <div>

      <h2>Employee Management</h2>

      <AddEmployeeForm refreshEmployees={fetchEmployees} />

      {loading && <p>Loading employees...</p>}

      {error && <p>{error}</p>}

      {!loading && employees.length === 0 && (
        <p>No employees found</p>
      )}

      <EmployeeTable
        employees={employees}
        refreshEmployees={fetchEmployees}
      />

    </div>
  );
}

export default EmployeesPage;