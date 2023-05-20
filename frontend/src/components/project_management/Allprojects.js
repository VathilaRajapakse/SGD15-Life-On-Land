import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";
import { useParams } from "react-router-dom";
import "../../styles/navBar.css";
//import "../styles/project_css/common.css";
//import "../styles/project_css/header.css";
//import "../styles/project_css/retriveTable.css";
//import "../styles/anushka_css/stylePrescription.css"
import Procard from "./procard";
import "../../styles/project_css/allproject.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Allprojects() {
  const [project, setproject] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [serQuary, setSerQuary] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    function getVolunteer() {
      axios
        .get(`http://localhost:8080/project/`)
        .then((res) => {
          console.log(res.data);
          setproject(res.data.existingProject);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getVolunteer();
  }, []);

  //delete the somthing page is reffesh
  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    setFilteredBlogs(
      project.filter((project) =>
        project.projectName.toLowerCase().includes(serQuary.toLowerCase())
      )
    );
  }, [project, serQuary]);

  function searchBlogs(event) {
    setSerQuary(event.target.value);
  }

  return (
    <div className="main-container-project">
      <NavBar />

      <div></div>

      <div className="project-card-track">
        <div>
        <div>
        <h3 className="title-name-project" style={{ fontWeight: "bold"}} >
            PROJECTS
          </h3>
          <button className="project-create">
            <a
              href="/proadd"
              style={{ textDecoration: "none", color: "white" }}
            >
              + Create a New Project
            </a>
          </button>
        </div>
        
          <div className="search-projects">
            <input
              onChange={searchBlogs}
              type="search"
              placeholder="      Search"
              className="search-box-projects"
            />
          </div>
          </div>
        

        {filteredBlogs.map((e, index) => (
          <Procard
            projectName={e.projectName}
            description={e.description}
            date={e.date.split("T")[0]}
            stime={e.stime}
            etime={e.etime}
            location={e.location}
          />
        ))}
      </div>

      <Sidebar />
    </div>
  );
}
