import React from "react";
import API from "../services/api";

function EmployeeTable({employees,refreshEmployees}) {

  const deleteEmployee = (id) => {

    API.delete(`/employees/${id}/`)
      .then(() => {

        refreshEmployees();

      })
      .catch(() => {

        alert("Failed to delete employee");

      });

  };

  return (

    <table border="1">

      <thead>

        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>

      </thead>

      <tbody>

        {employees.map((emp) => (

          <tr key={emp.id}>

            <td>{emp.employee_id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>

            <td>
              <button                
                className="delete-btn"
                onClick={()=>deleteEmployee(emp.id)}>
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}

export default EmployeeTable;