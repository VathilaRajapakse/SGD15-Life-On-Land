/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
// import "../../styles/home.css";
// import "../../styles/navBar.css";
import "../../styles/BlogView.css";
import Image from "../../image/Wild.png";
import Sidebar from "../Navbar";
import Card from "./blogEditcard";
import { lightBlue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";


export default function AllProjects(props) {
  const [blogs, setBlogs] = useState([]);
  const [deleteBlog, setDeleteBlog] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [postid, setpostid] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/blog/`)
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data.existingPosts);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  function handleDeleteBlog(blog) {
    setBlogToDelete(blog);
    setDeleteBlog(true);
  }
  const confirmDeletebox = (id) => {
    setDeleteBlog(true);
    setpostid(id);
  };
  async function confirmDeleteBlog(val) {
    if ((val = "delete")) {
      try {
        await axios
          .delete(`http://localhost:8080/blog/delete/${postid}`)
          .then((res) => {
            alert("Deleted Successful");
            window.location.reload();
          });
      } catch (err) {
        alert(err.message);
      }
    }
  }
  // const updatehandler = async () => {
  //   try {
  //     await axios
  //       .put(`http://localhost:8080/post/update/${postid}`)
  //       .then((res) => {
  //         alert("Deleted Successful");
  //         window.location.reload();
  //       });
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };
  return (
    <div className="main1-container">
      {/* <NavBar /> */}
      <div className="card-track">
        {/* <h3 className="title-name">BLOGS</h3> */}
        {blogs.map((blog, index) => (
  <div key={index}>
    <div className="cardbody">
      <figure>
      <div className="image-container">
      <img width="100%" src={`http://localhost:8080/get/image/${blog.blog_title}`} alt={blog.blog_title} />
        </div>
        <figcaption>
          <Link to={"/edit/" + blog._id}>
            <EditIcon sx={{ marginTop: -10, marginLeft: 5, fontSize: 40, color: lightBlue[50] }} />
          </Link>
          <DeleteIcon
            onClick={() => confirmDeletebox(blog._id)}
            sx={{ marginBottom: 5.5, marginLeft: 7, fontSize: 40, color: lightBlue[50] }}
          />
        </figcaption>
      </figure>
    </div>
  </div>
))}
      </div>
      <Dialog open={deleteBlog} onClose={() => setDeleteBlog(false)}>
        <DialogTitle>Warning!</DialogTitle>
        <DialogContent>Are you sure you want to delete the blog?</DialogContent>
        <DialogActions>
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              onClick={() => confirmDeleteBlog("delete")}
              autoFocus
              color="secondary"
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {/* <Sidebar /> */}
    </div>
  );
}
