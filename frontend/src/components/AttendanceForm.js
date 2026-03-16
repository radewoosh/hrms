import React,{useEffect,useState} from "react";
import API from "../services/api";
import AttendanceHistory from "./AttendanceHistory";

function AttendanceForm(){

 const [employees,setEmployees] = useState([]);
 const [employee,setEmployee] = useState("");
 const [date,setDate] = useState("");
 const [status,setStatus] = useState("present");
 const [refreshHistory, setRefreshHistory] = useState(0);
 useEffect(()=>{

  API.get("/employees/")
  .then(res=>setEmployees(res.data))

 },[]);

 const submitAttendance = (e)=>{

  e.preventDefault();

  API.post("/attendance/",{
   employee,
   date,
   status
  })
  .then(()=>{
 alert("Attendance marked")
 setRefreshHistory(prev => prev + 1)
    })
  .catch(()=>{
   alert("Failed")
  })

 }

 return(

  <div>

  <form onSubmit={submitAttendance}>

   <h3>Mark Attendance</h3>

   <select
   value={employee}
   onChange={(e)=>setEmployee(e.target.value)}
   required>

    <option value="">Select Employee</option>

    {employees.map(emp=>(
     <option key={emp.id} value={emp.id}>
      {emp.full_name}
     </option>
    ))}

   </select>

   <input
   type="date"
   value={date}
   onChange={(e)=>setDate(e.target.value)}
   required
   />

   <select
   value={status}
   onChange={(e)=>setStatus(e.target.value)}>

    <option value="present">Present</option>
    <option value="absent">Absent</option>

   </select>

  <button className="primary-btn" type="submit">
    Mark Attendance
    </button>

  </form>

 <AttendanceHistory 
  employeeId={employee}
  refreshTrigger={refreshHistory}
/>

  </div>

 )

}

export default AttendanceForm;