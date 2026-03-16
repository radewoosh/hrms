import React, { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceHistory({ employeeId, refreshTrigger }){

  const [records, setRecords] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(() => {

    if (!employeeId) return;

    setLoading(true);

    API.get(`/attendance/employee/?employee=${employeeId}`)
      .then((res) => {

        setRecords(res.data);
        setLoading(false);

      })
      .catch(() => {

        setError("Failed to load attendance");
        setLoading(false);

      });

  },[employeeId, refreshTrigger]);

  if (!employeeId) {
    return <p>Select employee to view attendance</p>;
  }

  if (loading) {
    return <p>Loading attendance...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (records.length === 0) {
    return <p>No attendance records</p>;
  }

  return (

    <div className="card">

      <h3>Attendance History</h3>

      <table border="1">

        <thead>

          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {records.map((rec) => (

            <tr key={rec.id}>

              <td>{rec.date}</td>
              <td>{rec.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceHistory;