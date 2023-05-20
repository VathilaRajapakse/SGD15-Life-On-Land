import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeButton from "../blogs_managment/likebutton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../styles/card.css";
import Rating from "@mui/material/Rating";

function Card(props) {
  // Use object destructuring to initialize state variables
  const [seeMore, setSeeMore] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [value, setValue] = React.useState(0);
  const [active, setActive] = useState(false);
  const [rating, setRating] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/rating/details/${props.id}`)
      .then((res) => {
        setRating(res.data.data[0]);
      })
      .catch((err) => {
        alert(err.message);
      });
    }, [value]);
    
    
  const ratinghandler = (event, value) => {
    console.log(value);
    setValue(value);
    const data = {
      blogID: props.id,
      blogName: props.topic,
      rating: value,
    };
    axios
      .post(`http://localhost:8080/rating/save`,data)
      .then((res) => {
        alert(res.data.message)
        // setRating(res.data.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="blogger-container">
        <AccountCircleIcon />
        <p>{props.blogger_name}</p>
      </div>

      <div className="card-container">
        {/* Use props to access data passed down from the parent component */}
        <div className="image-container">
          <img
            width="100%"
            src={`http://localhost:8080/get/image/${props.topic}`}
            alt={props.blog_title}
          />
        </div>
        <div className="topic-container">
          <h4>{props.topic}</h4>
        </div>
        <div className="description-container">
          {/* Use ternary operator to conditionally apply the "description" class */}
          <p className={seeMore ? "description" : ""}>{props.description}</p>
        </div>
        <div className="action-container">
          {/* Render the LikeButton component */}
          <Rating
        
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              ratinghandler(event, newValue);
            }}
            readOnly={active}
          />
          
          {rating&&<><h5>{rating.avg}/5</h5></>}

          {/* <LikeButton /> */}
          <button className="Read-more" onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? "Read more" : "Less more"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
