import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import "../../styles/navBar.css";
import "../../styles/post_css/common.css";
import "../../styles/header.css";
// import "../styles/post_css/addpost.css";
import "../../styles/post_css/form.css";
import Postsidebar from "./postView";

export default function Allprojects() {
  const [username, setusername] = useState([]);
  const [description, setdescription] = useState([]);
  const [fileUpload, setFileUpload] = useState();

  //page refresh function

  function refreshPage() {
    window.location.reload(false);
  }

  //Creating new Appointment
  function sendData(s) {
    s.preventDefault();

    //Creating object
    const newpost = {
      username,
      description,
    };

    const imageSave = new FormData();
    imageSave.append("post", fileUpload);

    axios.post("http://localhost:8080/post/save", newpost).then(() => {
      axios
        .post(`http://localhost:8080/upload/post/${description}`, imageSave)
        .then((res) => {
          alert("post successfully added");
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
        <div className="p2">
          <b>Create New post</b>
        </div>
        <a href="/home" class="previous">
          &laquo; <i class="bi bi-arrow-return-left"></i>Back
        </a>
        <form className="createpost" onSubmit={sendData}>
          <div className="projectName-container">
            <label for="userName">
              <b>User Name:</b>
            </label>{" "}
            <br />
            <input
              type="text"
              id="userName"
              className="postvalues"
              name="userName"
              onChange={(event) => {
                setusername(event.target.value);
              }}
              required
            />
          </div>
          <br />

          <div className="discription-container">
            <label for="discription">
              <b>Discription:</b>
            </label>
            <br />
            <textarea
              type="textarea"
              id="discription"
              className="postvalues1"
              name="discription"
              onChange={(event) => {
                setdescription(event.target.value);
              }}
              required
            />
          </div>
          <br />

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

          <input type="submit" id="postsaveBtn" value="SUBMIT"></input>
        </form>
      </div>

      <Postsidebar />
    </div>
  );
}
