/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import "../../styles/post_css/homepost.css";
import "../../styles/navBar.css";
import "../../styles/post_css/postView.css";
import Image from "../../image/sr.jpg";
import Sidebar from "../post_management/Sidebar";
// import Card from "./blogEditcard";
import { lightBlue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link ,useParams} from "react-router-dom";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";

export default function AllProjects() {
  const [posts, setposts] = useState([]);
  const [deletePost, setDeletePost] = useState(false);
  const [postToDelete, setpostToDelete] = useState(null);
  const [postid, setpostid] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts/`)
      .then((res) => {
        console.log(res.data);
        setposts(res.data.existingPosts);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  function handleDeletePost(posts) {
    setpostToDelete(posts);
    setDeletePost(true);
  }
  const confirmDeletebox = (id) => {
    setDeletePost(true);
    setpostid(id);
  };
  async function confirmDeletePost(val) {
    if ((val = "delete")) {
      try {
        await axios
          .delete(`http://localhost:8080/post/delete/${postid}`)
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
    <div className="nav_main_container">
    <div className="main1-container">
     
      <div className="postcard-track">
        <h3 className="posttitle-name">POSTS</h3>
        {posts.map((post, index) => (
          <div key={index}>
            <div className="postcardbody">
              <figure>
                <img
                  src={Image}
                  width={"250px"}
                  height={"300px"}
                  alt="Mountains"
                />
                 {/* <img width="100%" src={`http://localhost:8080/${post.post}`} alt={id} /> */}
                <figcaption>
                  <Link to={"/update/" + post._id}>
                    <EditIcon sx={{marginTop:-10 ,marginLeft:5, fontSize: 40, color: lightBlue[50] }} />
                  </Link>
                  <DeleteIcon
                    onClick={() => confirmDeletebox(post._id)}
                    sx={{marginBottom:5.5,marginLeft:7, fontSize: 40, color: lightBlue[50] }}
                  />
                </figcaption>
              </figure>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={deletePost} onClose={() => setDeletePost(false)}>
        <DialogTitle>Warning!</DialogTitle>
        <DialogContent>Are you sure you want to delete the post?</DialogContent>
        <DialogActions>
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              onClick={() => confirmDeletePost("delete")}
              autoFocus
              color="secondary"
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    
    </div>
    </div>
  );
}
