import React,{useState} from "react";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import "./index.css";

function App(){

 const [page,setPage] = useState("employees");

 return(

  <div>

   <div className="navbar">
     <button className={page==="employees" ? "active-btn" : ""} onClick={()=>setPage("employees")}>
       Employees
     </button>

     <button className={page==="attendance" ? "active-btn" : ""}  onClick={()=>setPage("attendance")}>
       Attendance
     </button>
   </div>

   <div className="container">

    <p style={{textAlign:"center",color:"#555"}}>
 Simple Human Resource Management System
</p>

    <h1>HRMS Lite</h1>

    {page==="employees" && <EmployeesPage/>}
    {page==="attendance" && <AttendancePage/>}

   </div>

  </div>

 )

}

export default App;