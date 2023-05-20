import React, { useState, useEffect } from "react";
import "../../styles/product_css/pcard.css";
import Image from "../../image/pen.jpeg";
import { useParams } from "react-router-dom";
import axios from "axios";

function Card(props) {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${props.id}`)
      .then((getData, res) => {
        // setblog(getData.data.post.blog_title);
        // setdes(getData.data.post.description);
        //console.log(getData.data.post.blog_title);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pcard-main-container">
      <div className="pcard-container">
        <div className="pimage-container">
          <img
            width="100%"
            src={`http://localhost:8080/get/image/${props.productname}`}
            alt={props.productname}
          />
          {/* <img src={Image} alt="image" className="pimage" /> */}
        </div>

        <div className="pname">
          <h4>{props.productname}</h4>
        </div>

        <div className="product-des-container">
          <h4>{props.productdescription}</h4>
        </div>

        <div className="product-price-container">
          <h4>{props.productprice}</h4>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Card;
