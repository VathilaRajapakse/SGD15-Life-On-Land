import React, { useState } from "react";
//import "../../styles/card.css";
//import Image from "../../image/sr.jpg";
import "../../styles/project_css/procard.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Like from "../project_management/ProLike"


function procard(props) {
   // const [seeMore,setSeeMore]= useState(true)
  return ( 
    
      <div className="procard-container">
       
       <div className="proimage-container">
          <img width="100%" src={`http://localhost:8080/get/image/${props.projectName}`} alt={props.projectName} />
        </div>

        
        <div className="project-name-container">
          <h1>{props.projectName}</h1>
        </div>

        <div className="project-description-container">
          <p>{props.description}</p>
        </div>
        

        {/* <div className="project-photo-container">
          <h4>{props.photo}</h4>
        </div> */}

<div className="project-time-container">
        <div className="proicon1">
        <DateRangeIcon fontSize="small" className='iconcolor' style={{ marginLeft: "45px" }} />
          <p>{props.date}</p>
          </div>
        </div>
       

        <div className="project-time-container">
        <div className="proicon1">
        <AccessTimeIcon fontSize="small" className='iconcolor' style={{ marginLeft: "45px" }} />
          <p>{props.stime}</p>
          </div>
        </div>

        <div className="project-time-container">
        <div className="proicon1">
        <AccessTimeIcon fontSize="small" className='iconcolor' style={{ marginLeft: "45px" }} />
          <p>{props.etime}</p>
          </div>
        </div>


        <div className="project-location-container">
        <div className="proicon2">
        <AddLocationIcon fontSize="small" className='iconcolor' style={{ marginLeft: "45px" }} />
          <p>{props.location}</p>
          </div>
        </div>

        
       
        <div className="like-container">
          <Like />
          <a href="/vform">
          <button className="jbutton">JOIN</button>
          </a>
        </div>
      </div>
   
  );
}

export default procard;