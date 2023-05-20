import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import "../styles/registration.css";
import Sidebar from "./blogs_managment/Sidebar";


export default function Registration() {
   const [fullname, setFname] = useState([]);
   const [address, setAddress] = useState([]);
   const [contact, setContact] = useState([]);
   const [email, setemail] = useState([]);
   const [userName, setusername] = useState([]);
   const [password, setpassword] = useState([]);


 

  //page refresh function

  function refreshPage() {
    window.location.reload(false);
  };

  

  //Creating new Appointment
  function sendData(s){
    s.preventDefault();

    //Creating object
    const newmember ={
      fullname,
      address,
      contact,
      email,
      userName,
      password
            
    }
    
    //passing data to the DB
    axios.post("http://localhost:8080/register/save", newmember).then(()=>{

      alert("Registration successful",refreshPage());
      console.log(newmember);

    }).catch((err)=>{

      alert("Error: Registration unsuccessful");
      console.log(err);

    })

  }

       
    

  return (
    <div className="main-container">

      

        <NavBar />
        <div className="body-container clearfix">
     
        
        <form className="reg-form" onSubmit={sendData}>   
        <div className='projectName-container'>
              <label className = "reg-full-name"><b>Full Name:</b></label> <br/>
              <input type="text" className="reg-name"  name="fullName"  onChange={(event)=>{
                  setFname(event.target.value);
              }} required/>
              </div><br/>

                   
              <div className='time-container'>
              <label className = "reg-address"><b>Address:</b></label> <br/>
              <input type="text" id="address" className="reg-name"    name="address"  onChange={(event)=>{
                  setAddress(event.target.value);
              }} required/>
              </div><br/>

              
              <div className='location-container'>
              <label className = "reg-contact"><b>Contact No:</b></label> <br/>  
              <input type="text"  id="contact" className="reg-contact-input"   name="contact"  onChange={(event)=>{
                  setContact(event.target.value);
              }} required/>
              </div><br/>

              <div className='discription-container'>
              <label for="nic"><b>Email:</b></label><br/> 
              <input type="text" id="email" className="valuesV" name="email"  onChange={(event)=>{
                  setemail(event.target.value);
              }} required/>
              </div><br/>



              <div className='discription-container'>
              <label for="userName"><b>User Name:</b></label><br/> 
              <input type="text" id="userName" className="valuesV" name="userName"  onChange={(event)=>{
                  setusername(event.target.value);
              }} required/>
              </div><br/>


              <div className='discription-container'>
              <label for="password"><b>Password:</b></label><br/> 
              <input type="text" id="password" className="valuesV" name="password"  onChange={(event)=>{
                  setpassword(event.target.value);
              }} required/>
              </div><br/>

              <div className='discription-container'>
              <label for="password"><b>Confirm Password:</b></label><br/> 
              <input type="text" id="password" className="valuesV" name="password"  onChange={(event)=>{
                  setpassword(event.target.value);
              }} required/>
              </div><br/>

              <input  type="submit" id="joinBtn"  value="REGISTER"></input><br/><br/>
              
            
              </form>
              
        </div>
       

        
    </div>
    

    );
}