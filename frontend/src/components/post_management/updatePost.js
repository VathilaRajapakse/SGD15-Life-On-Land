/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
// import "../../styles/formedit.css";
import NavBar from "../Navbar";
import Sidebar from "../post_management/Sidebar";
import "../../styles/post_css/update.css";
import Button from 'react-bootstrap/Button';
import Postsidebar from "./postView";

export default function Update() {
  //const navigate = useNavigate();
  //const { posts, setposts } = useState();
  const { id } = useParams();
  
  const [description, setdes] = useState();
  const [fileUpload, setFileUpload] = useState();
 
  
  useEffect(() => {
    axios.get(`http://localhost:8080/post/`+ id).then(
      (res) => {
        const post = res.data.post;
        setdes(res.data.post.description);
       
    
        
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendDataToAPI = () => {
    const data = {
    
      description,  
      
    };
    axios.put(`http://localhost:8080/post/update/${id}`, data)
      .then((res) => {
        alert("Update Successful");
        //navigate(-1);
      })
      .catch((err) => {
        alert("Update Unsuccessful");
      });
      if (fileUpload) {
        const imageSave = new FormData();
        imageSave.append("post", fileUpload);
  
        {
          axios
            .post(`http://localhost:8080/upload/post/${description}`, imageSave)
            .then(() => {});
        }
      }
  };

  return (
    <div className="main-container">    
      <NavBar/>
      <div className="card-track">     
            <h3 className="post_title_sub_update">POST</h3> 
            <a href="/home" class="previous">&laquo; <i class="bi bi-arrow-return-left"></i>Back</a>
            <h6 className="post-title-sub-update-2">Update Posts</h6>

      <div className="dropdown" ></div>
      
      <form className="post_update_form">              
        
          
          
          <div className="post_update_item">
            <label className="post_update_label" for="postdescription">
              Description
            </label>
            <textarea className="post_update_half_item"
                  type="text"
                  id="postdescription"
                  name="postdescription"
                  value={description}
                  onChange={(e) => setdes(e.target.value)}
                
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
                   
          <button
              type="submit"
              className="post_update_btn"              
              onClick={sendDataToAPI}
            >
              Update
            </button>
      </form>
      </div>
      <Postsidebar/>
    </div>
    
  );
}