/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/formedit.css";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";

export default function Update() {
  const { id } = useParams();
  const [blog_title, setblog] = useState("");
  const [description, setdes] = useState();
  const [blogger_name, setblogger] = useState("");
  const [fileUpload, setFileUpload] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8080/blog/${id}`).then((response) => {
      const post = response.data.post;
      setblog(post.blog_title);
      setdes(post.description);
      setblogger(post.blogger_name);
    });
  }, [id]);

  const sendDataToAPI = () => {
    const data = {
      blog_title,
      description,
      blogger_name,
    };
    axios
      .put(`http://localhost:8080/blog/update/${id}`, data)
      .then(() => {
        alert("Update Successful");
      })
      .catch(() => {
        alert("Update Unsuccessful");
      });

    if (fileUpload) {
      const imageSave = new FormData();
      imageSave.append("blogPic", fileUpload);

      {
        axios
          .post(`http://localhost:8080/upload/blogPic/${blog_title}`, imageSave)
          .then(() => {});
      }
    }
  };

  return (
    <div className="main-container">
      <NavBar />
      <div className="card-track">
        <h3 className="blog-title-sub-edit">BLOGS</h3>
        <h6 className="blog-title-sub-edit-2">Update Blogs</h6>

        <div className="dropdown"></div>

        <form className="blog-edit-form">
          <div className="blog-edit-item-2">
            <label className="blog-edit-label-2" for="name">
              Blogger Name
            </label>
            <input
              className="blog-edit-half-item-2"
              type="text"
              name="blog_name"
              id="name1"
              value={blogger_name}
              onChange={(e) => setblogger(e.target.value)}
            />
            <input
              className="chooseFile"
              type="file"
              name="Choose file"
              onChange={(e) => {
                setFileUpload(e.target.files[0]);
              }}
            />
          </div>

          <div className="blog-edit-item">
            <label className="blog-edit-label" for="name">
              Blog title
            </label>
            <input
              className="blog-edit-half-item"
              type="text"
              name="blog_title"
              id="name1"
              value={blog_title}
              onChange={(e) => setblog(e.target.value)}
            />
          </div>

          <div className="blog-edit-item">
            <label className="blog-edit-label" for="description">
              Description
            </label>
            <textarea
              className="blog-edit-half-item"
              type="text"
              id="description1"
              name="description1"
              value={description}
              onChange={(e) => setdes(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="blog-edit-btn"
            onClick={sendDataToAPI}
          >
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
