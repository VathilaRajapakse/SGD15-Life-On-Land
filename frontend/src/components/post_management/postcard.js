import React, { useState, useEffect } from "react";
// import Image from "../../image/sr.jpg";
import LikeButton from "../post_management/LikeButton";
import "../../styles/post_css/postcard.css";
import "../../styles/post_css/bt.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DislikeButton from "../post_management/DislikeButton";

function Procard(props) {
  // const [seeMore,setSeeMore]= useState(true)
  const [seeMore, setSeeMore] = useState(true);
  const [posts, setPosts] = useState([]);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const handleVote = async (option) => {
    if (voteSubmitted) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option }),
      });
      const data = await response.json();
      if (data.success) {
        if (option === "yes") {
          setYesCount(yesCount + 1);
        } else if (option === "no") {
          setNoCount(noCount + 1);
        }
        setVoteSubmitted(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await fetch("http://localhost:8080/poll");
        const data = await response.json();
        if (data.success) {
          setYesCount(data.poll.yesCount);
          setNoCount(data.poll.noCount);
          setIsLoading(false);
          setVoteSubmitted(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPollData();
  }, []);
  const totalVotes = yesCount + noCount;
  const yesPercentage = (yesCount / totalVotes) * 100;
  const noPercentage = (noCount / totalVotes) * 100;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postcard-container">
      <div className="post-container">
        <pre>
          <AccountCircleIcon /> {props.username}
        </pre>
      </div>

      <div className="postimage-container">
        <p className={seeMore ? "description" : ""}>{props.description}</p>
        <img
          width="100%"
          src={`http://localhost:8080/get/image/${props.description}`}
          alt={props.description}
        />
      </div>

      {/* <div className="project-description-container">
              <p>{props.description}</p>
            </div>

            <div className="image-container">
              <img src={Image} alt="image" className="image" />
            </div>
            

            <div className="like-container">
              <LikeButton />
            </div> */}

      {/* Use props to access data passed down from the parent component */}

      <div className="postdescription-container">
        {/* Use ternary operator to conditionally apply the "description" class */}

        <p>Are you agree with this?</p>
      </div>
      <div className="kkk">
        {/* Render the LikeButton component */}

        <div>
          {/* <div >
        
            <button onClick={() => handleVote("yes")} disabled={voteSubmitted}>
              Yes
            </button>
           
            </div>
            <div>
            <button onClick={() => handleVote("no")} disabled={voteSubmitted}>
              No
            </button>
          
            </div> */}

          <div className="button-container">
            <button onClick={() => handleVote("yes")} disabled={voteSubmitted}>
              Yes
            </button>
            <br />
            &nbsp;
            <button onClick={() => handleVote("no")} disabled={voteSubmitted}>
              No
            </button>
          </div>

          {/* <p>
            Yes Percentage:{" "}
            {isNaN(yesPercentage) ? 0 : yesPercentage.toFixed(2)}%
          </p>
          <p>
            No Percentage: {isNaN(noPercentage) ? 0 : noPercentage.toFixed(2)}%
          </p> */}

          <div className="poll-option">
            <p>Yes</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${yesPercentage}%` }}
              ></div>{" "}
              <span className="percentage">{yesPercentage.toFixed(2)}%</span>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <p>No</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${noPercentage}%` }}
              ></div>
              <span className="percentage">{noPercentage.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Procard;
