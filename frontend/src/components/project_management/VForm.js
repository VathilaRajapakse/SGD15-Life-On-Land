import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";
import { useParams } from "react-router-dom";
import "../../styles/navBar.css";
//import "../styles/project_css/common.css";
//import "../styles/project_css/header.css";
//import "../styles/project_css/retriveTable.css";
import "../../styles/project_css/vform.css";

export default function Allprojects() {
  const [fullName, setfname] = useState([]);
  const [address, setaddress] = useState([]);
  const [contactNo, setcontactno] = useState([]);
  const [nic, setnic] = useState([]);

  //page refresh function

  function refreshPage() {
    window.location.reload(false);
  }

  //Creating new Appointment
  function sendData(s) {
    s.preventDefault();

    //Creating object
    const newmember = {
      fullName,
      address,
      contactNo,
      nic,
    };

    //passing data to the DB
    axios
      .post("http://localhost:8080/volunteer/save", newmember)
      .then(() => {
        alert("member join is successful", refreshPage());
        console.log(newmember);
      })
      .catch((err) => {
        alert("Error: member not added");
        console.log(err);
      });
  }

  return (
    <div className="main-container">
      <NavBar />
      <div className="body-container">
        <div className="n4">
          <b>You want to be A Volunteer,</b>
        </div>
        <div className="n5">
          <b>JOIN WITH US</b>
        </div>
        <form className="createVform" onSubmit={sendData}>
          <div className="projectName-container">
            <label for="fullName">
              <b>Full Name:</b>
            </label>{" "}
            <br />
            <input
              type="text"
              id="fullName"
              className="valuesV"
              name="fullName"
              onChange={(event) => {
                setfname(event.target.value);
              }}
              required
            />
          </div>
          <br />

          <div className="time-container">
            <label for="address">
              <b>Address:</b>
            </label>{" "}
            <br />
            <input
              type="text"
              id="address"
              className="valuesV"
              name="address"
              onChange={(event) => {
                setaddress(event.target.value);
              }}
              required
            />
          </div>
          <br />

          <div className="location-container">
            <label for="contactNo">
              <b>Contact No:</b>
            </label>{" "}
            <br />
            <input
              type="text"
              id="contactNo"
              className="valuesV"
              name="contactNo"
              onChange={(event) => {
                setcontactno(event.target.value);
              }}
              required
            />
          </div>
          <br />

          <div className="discription-container">
            <label for="nic">
              <b>NIC:</b>
            </label>
            <br />
            <input
              type="text"
              id="nic"
              className="valuesV"
              name="nic"
              onChange={(event) => {
                setnic(event.target.value);
              }}
              required
            />
          </div>
          <br />
          <input type="submit" id="joinBtn" value="Team Up"></input>
          <br />
          <br />
          <lable className="l1">
            <b>Click here to add you details.</b>
          </lable>
          <br />
          <lable className="l2">Any requests please contact</lable>
          <br />
          <lable className="l2">helpnature.hn@gmail.com</lable>
        </form>
      </div>

      <Sidebar />
    </div>
  );
}
