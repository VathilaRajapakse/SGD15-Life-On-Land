import React, { useState } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";
import "../../styles/form.css";

export default function CreateBlogs() {
  const [blogger_name, setBloggerName] = useState("");
  const [blog_title, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUpload, setFileUpload] = useState();

  //handle and convert in in base 64

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "blogger_name") {
      setBloggerName(value);
    } else if (name === "blog_title") {
      setBlogTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (blog_title.trim().length === 0) {
      alert("blog title cannot be empty !");
    } else if (description.trim().length === 0) {
      alert("description cannot be empty !");
    } else if (blogger_name.trim().length === 0) {
      alert("name cannot be empty !");
    } else if (!fileUpload) {
      alert("Please select an image to upload");
    } else {
      const data = {
        blogger_name: blogger_name,
        blog_title: blog_title,
        description: description,
      };

      console.log(data);

      const imageSave = new FormData();
      imageSave.append("blogPic", fileUpload);

      axios.post("http://localhost:8080/blog/save", data).then((res) => {
        axios
          .post(`http://localhost:8080/upload/blogPic/${blog_title}`, imageSave)
          .then((res) => {
            alert("Blog successfully added");
          });
      });
    }
  };

  // eslint-disable-next-line no-lone-blocks
  {
    return (
      <div className="main-container">
        <NavBar />
        <div className="card-track">
          <h3 className="blog-title-sub">BLOGS</h3>
          <h6 className="blog-title-sub-2">Create Blogs</h6>
          <form className="blog-form">
            <div className="blog-item-2">
              <label className="blog-label-2" for="name">
                Blogger name
              </label>
              <div>
                <input
                  className="chooseFile"
                  type="file"
                  name="Choose file"
                  onChange={(e) => {
                    setFileUpload(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <input
              className="blog-half-item"
              type="text"
              name="blogger_name"
              id="name"
              value={blogger_name}
              onChange={handleInputChange}
              required
            />

            <div className="blog-item">
              <label className="blog-label" for="name">
                Blog title
              </label>
              <input
                className="blog-half-item"
                type="text"
                name="blog_title"
                id="name"
                value={blog_title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="blog-item">
              <label className="blog-label-3" for="description">
                Description
              </label>
              <textarea
                className="blog-half-item"
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              href="/"
              type="submit"
              className="btn-blog"
              onClick={onSubmit}
              navigateTo={"/"}
            >
              SUBMIT
            </button>
          </form>
        </div>
        <Sidebar />
      </div>
    );
  }
}
