import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";
import Card from "./postcard";
import "../../styles/post_css/homepost.css";
import "../../styles/navBar.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Allprojects() {
  const [posts, setPosts] = useState([]);
  const [serQuary, setSerQuary] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // function refreshPage(){
  //   window.location.reload(false);
  // }

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts/")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.existingPosts);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  // useEffect(() => {
  //   setFilteredBlogs(
  //     posts.filter(
  //       (post) =>
  //         post.username.toLowerCase().includes(serQuary.toLowerCase())
  //     )
  //   );
  // }, [posts, serQuary]);

  function searchPosts(event) {
    setSerQuary(event.target.value);
  }
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
        headers: {
          "Content-Type": "application/json",
        },
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
        localStorage.setItem("voteSubmitted", "true"); // Store the voting status in localStorage
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
          setVoteSubmitted(localStorage.getItem("voteSubmitted") === "true"); // Check the voting status from localStorage
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
    <div className="main-container-posts">
      <NavBar />
      <div className="postcard-track">
        <div className="posttesting">
          <pre>
            <h3 className="posttitle-name" style={{ fontWeight: "bold" }}>
              POSTS
            </h3>
          </pre>
          <input className="posts-search" onChange={searchPosts} placeholder="Search" />
          <h3 className="posttitle-name" style={{ fontWeight: "Medium" }}>
            What do you want to talk about?
          </h3>
        </div>
        <button className="post_create">
          <a href="/All" style={{ textDecoration: "none", color: "white" }}>
            + ADD NEW POSTS
          </a>
        </button>
        {posts &&

          posts.filter(e =>
            e.username.toLowerCase().includes(serQuary) ||

            e.username.includes(serQuary) 

        ).map((post, index) => (
            <Card
              key={index}
              username={post.username}
              description={post.description}
            />
          ))}
        {/* <div>
          <h2>Vote in the Poll</h2>
          <button onClick={() => handleVote("yes")} disabled={voteSubmitted}>
            Yes
          </button>
          <button onClick={() => handleVote("no")} disabled={voteSubmitted}>
            No
          </button>
         
          <p>
            Yes Percentage:{" "}
            {isNaN(yesPercentage) ? 0 : yesPercentage.toFixed(2)}%
          </p>
          <p>
            No Percentage: {isNaN(noPercentage) ? 0 : noPercentage.toFixed(2)}%
          </p>
        </div> */}
      </div>
      <Sidebar />
    </div>
  );
}
