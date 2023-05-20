import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Sidebar from "../blogs_managment/Sidebar";
import Card from "./card";
import "../../styles/home.css";
import "../../styles/navBar.css";
// import "../../styles/common.css";
import "../../styles/header.css";


import SearchIcon from '@mui/icons-material/Search';

export default function Allprojects() {
  const [blogs, setBlogs] = useState([]);
  const [serQuary, setSerQuary] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  function refreshPage(){
    window.location.reload(false);
  }

  const myStyle={
    backgroundImage: 
"url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
   
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

  useEffect(() => {
    axios
      .get("http://localhost:8080/blog/")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data.existingPosts);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    setFilteredBlogs(
      blogs.filter(
        (blog) =>
          blog.blog_title.toLowerCase().includes(serQuary.toLowerCase())          
      )
    );
  }, [blogs, serQuary]);

  function searchBlogs(event) {
    setSerQuary(event.target.value);
  }

  return (
    <div  >
    <div className="main1-container" >
      <NavBar />
      <div className="card-track">
        {/* <div className="testing">
          <h3 className="title-name" style={{ fontWeight: "bold"}} >
            BLOGS
          </h3>
          <div className="search-blogs-1">
              <input
                onChange={searchBlogs}
                type="search"
                placeholder="    Search"
                className="search-box-blogs"
              />
          </div>
        </div> */}
        {/* <button className="blog-create">
          <a href="/blog/add" style={{ textDecoration: "none", color: "white" }}>
          + BECOME A BLOGGER
          </a>
        </button> */}
        {filteredBlogs.map((blog, index) => (
          <Card key={index} blogger_name={blog.blogger_name} topic={blog.blog_title} description={blog.description} />
        ))}
      </div>
      <Sidebar />
    </div>
    </div>
  );
}