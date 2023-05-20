import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import AllprojectSidebar from "./AllProSidebar";
import { useParams} from "react-router-dom";
import "../../styles/navBar.css";
// import "../../styles/project_css/common.css";
// import "../../styles/header.css";
// import "../../styles/project_css/retriveTable.css";
import "../../styles/project_css/addproject.css";



export default function Allprojects() {
   const [projectName, setproname] = useState([]);
   //const [photo, setphoto] = useState([]);
   const [date, setDate] = useState([]);
   const [stime, setstime] = useState([]);
   const [etime, setetime] = useState([]);
   const [location, setlocation] = useState([]);
   const [description, setdescription] = useState([]);
   const [fileUpload, setFileUpload] = useState();


  //page refresh function

  function refreshPage() {
    window.location.reload(false);
  };

  

  //Creating new Appointment
  function sendData(s){
    s.preventDefault();

    //Creating object
    const newproject ={
        projectName,
        date,
        stime,
        etime,
        location,
        description
       
    }

    const imageSave = new FormData();
    imageSave.append("project", fileUpload);

    axios.post("http://localhost:8080/project/save", newproject).then(()=>{
      axios
        .post(`http://localhost:8080/upload/project/${projectName}`, imageSave)
        .then((res) => {
          alert("project successfully added");
        });
    });

    
    // //passing data to the DB
    // axios.post("http://localhost:8080/project/save", newproject).then(()=>{
      

    //   alert("project  is successful",refreshPage());
    //   console.log(newproject);

    // }).catch((err)=>{

    //   alert("Error: project not added");
    //   console.log(err);

    // })

  }




       
    

  return (
    <div className="main-container">

      

        <NavBar />
        <div className="body-container clearfix">
        <div className="n2"><b>Create New project</b></div>
        <form className="createform" onSubmit={sendData}>   
        <div className='projectName-container'>
              <label for="projectName"><b>project Name:</b></label> <br/>
              <input type="text" id="projectName"  className="values"  name="projectName"  onChange={(event)=>{
                  setproname(event.target.value);
              }} required/>
              </div><br/>

              
              {/* <div className='photo-container'>
              <label for="photo"><b>Choose Images</b></label>  &nbsp;  
              <input type="file" accept=".png, .jpg, .jpeg" id="photo"   name="photo"  onChange={(event)=>{
                  setphoto(event.target.value);
              }} />
              </div><br/> */}

                <input
                  className="chooseFile"
                  type="file"
                  name="Choose file"
                  onChange={(e) => {
                    setFileUpload(e.target.files[0]);
                  }}
                />
                <br/><br/>
                <div className="date-container">
              <label for="date"><b>Date:</b></label><br/>
              <input type="Date" id="date" className="values2"  name="date"  onChange={(event)=>{
                setDate(event.target.value);
              }} required/><br/><br/>
            </div>
              
              <div className='time-container'>
              <label for="stime"><b>start Time:</b></label> <br/>
              <input type="time" id="time" className="values2"    name="time"  onChange={(event)=>{
                  setstime(event.target.value);
              }} required/>
              </div><br/>

              <div className='time-container'>
              <label for="etime"><b>End Time:</b></label> <br/>
              <input type="time" id="time" className="values2"    name="time"  onChange={(event)=>{
                  setetime(event.target.value);
              }} required/>
              </div><br/>

              
              <div className='location-container'>
              <label for="location"><b>Location:</b></label> <br/>  
              <input type="text" id="location" className="values"   name="location"  onChange={(event)=>{
                  setlocation(event.target.value);
              }} required/>
              </div><br/>

              <div className='discription-container'>
              <label for="discription"><b>Discription:</b></label><br/> 
              <textarea type="textarea" id="discription" className="values1" name="discription"  onChange={(event)=>{
                  setdescription(event.target.value);
              }} required/>
              </div><br/>
              <input  type="submit" id="saveBtn"  value="SUBMIT"></input>
              </form>
        </div>
        

        <AllprojectSidebar />


        {/* update and delete */}
</div>
    );
}
