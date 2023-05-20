import React, { useState } from "react";
import "../styles/navBar.css";

import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
//import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MessageIcon from "@mui/icons-material/Message";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArticleIcon from "@mui/icons-material/Article";

import { NavLink } from "react-router-dom";
import Logo from "../image/logo.png";
import { Button } from "@mui/material";

// const [selects,setSelects] = useState();

export default function NavBar() {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  const handleLogout = () => {
    // Remove user authentication data from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setUserName(null);
  };

  const handleLogoutSelect = (event) => {
    if (event.target.value === "Logout") {
      handleLogout();
    }
  };

  function handleDropdownChange(event) {
    const selectedOption = event.target.value;

    if (selectedOption === "My Account") {
      // Redirect to the My Account page
      window.location.href = "";
    } else if (selectedOption === "Posts") {
      // Redirect to the Posts page
      window.location.href = "/changes";
    } else if (selectedOption === "Blogs") {
      // Redirect to the Blogs page
      window.location.href = "/AllBlog";
    } else if (selectedOption === "Products") {
      // Redirect to the Products page
      window.location.href = "/myproducts";
    } else if (selectedOption === "Projects") {
      // Redirect to the Projects page
      window.location.href = "/proadd";
    } else if (selectedOption === "Projects") {
    // Redirect to the Projects page
    window.location.href = "/Volunter"
  }
}

  return (
    <div className="nav_main_container">
      <div className="nav_header">
        <div>
          <img className="Logo" src={Logo} alt="Logo" />
        </div>
        <p className="nav_heading_text">helpNature</p>
      </div>
      <p className="hi">
        {userName ? `Welcome Back ${userName}! ` : "Hi!"}

        <select className="drop-down-navbar" onChange={handleDropdownChange}>
          <option className="dropdown-fonts-account">My Account</option>
          <option className="dropdown-fonts">Posts</option>
          <option className="dropdown-fonts">Blogs</option>
          <option className="dropdown-fonts">Products</option>
          <option className="dropdown-fonts">Projects</option>
          <option className="dropdown-fonts">Volunteers</option>
          {userName && (
            <option className="dropdown-fonts" value="Logout">
              Logout
            </option>
          )}
        </select>
      </p>
      <div className="nav_body">
        <NavLink to="/" className="link_styles">
          <div className="nav_link_wrapper">
            <HomeIcon
              fontSize="small"
              className="iconcolor"
              color="(18,120,35)"
              style={{ marginLeft: "45px" }}
            />
            <br />
            <p className="nav_link clearfix">
              <b>HOME</b>
            </p>
          </div>
        </NavLink>
      </div>
      <div className="nav_body">
        <NavLink to="/ProAll" className="link_styles">
          <div className="nav_link_wrapper">
            <EditIcon
              fontSize="small"
              className="iconcolor"
              style={{ marginLeft: "45px" }}
            />
            <br />
            <p className="nav_link clearfix">
              <b>PROJECTS</b>
            </p>
          </div>
        </NavLink>
      </div>
      <div className="nav_body">
        <NavLink to="/" className="link_styles">
          <div className="nav_link_wrapper">
            <ArticleIcon
              fontSize="small"
              className="iconcolor"
              style={{ marginLeft: "45px" }}
            />
            <br />
            <p className="nav_link clearfix">
              <b>BLOGS</b>
            </p>
          </div>
        </NavLink>
      </div>
      <div className="nav_body">
        <NavLink to="/Products" className="link_styles">
          <div className="nav_link_wrapper">
            <ShoppingBagIcon
              fontSize="small"
              className="iconcolor"
              style={{ marginLeft: "45px" }}
            />
            <br />
            <p className="nav_link clearfix">
              <b>PRODUCTS</b>
            </p>
          </div>
        </NavLink>
      </div>
      <div className="nav_body">
        <NavLink to="/home" className="link_styles">
          <div className="nav_link_wrapper">
            <MessageIcon
              fontSize="small"
              className="iconcolor"
              style={{ marginLeft: "45px" }}
            />
            <br />
            <p className="nav_link clearfix">
              <b>POSTS</b>
            </p>
          </div>
        </NavLink>
      </div>
      <div className="nav_body">
        <NavLink to="/" className="link_styles">
          <div className="nav_link_wrapper">
            <LocalPhoneIcon
              fontSize="small"
              className="iconcolor"
              style={{ marginLeft: "45px" }}
            />
            <br />
            <p className="nav_link clearfix">
              <b>CONTACT</b>
            </p>
          </div>
        </NavLink>
      </div>
      &nsbm;
      <div className="login1">
        <div className="login_wrapper">
          {userName ? (
            <p type="button" class="logout-btn" onClick={handleLogout}>
              Logout {userName}!
            </p>
          ) : (
            <NavLink to="/Login">
              <p className="login_s" type="button">
                LOGIN
              </p>
            </NavLink>
          )}
        </div>
      </div>
      <div className="login1">
        <NavLink to="/registration" className="login_s">
          <div className="singup">
            <button type="submit" class="btn">
              You don't have an Account ?
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
