import React, { Component, useState } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";
import "../../styles/product_css/addproducts.css";

export default function AddProducts() {
  const [productname, setProductname] = useState([]);
  const [productdescription, setproductdescription] = useState([]);
  const [productprice, setproductprice] = useState([]);
  const [fileUpload, setFileUpload] = useState([]);

  function sendData(s) {
    s.preventDefault();

    const newProduct = {
      productname,
      productdescription,
      productprice,
    };

    // onSubmit = (e) =>{
    //   e.preventDefault();

    //   const {productname,productdescription,productprice} = this.state;

    //   const data = {
    //     productname:productname,
    //     productdescription:productdescription,
    //     productprice:productprice
    //   }

    //   console.log(data)

    //   axios.post("http://localhost:8080/products/save",data).then((res) =>{
    //     if(res.data.success){
    //       alert("Create Success");
    //       this.setState(
    //         {
    //           productname:"",
    //           productdescription:"",
    //           productprice:""
    //         }
    //       )
    //     }
    //   })

    // }
    const imageSave = new FormData();
    imageSave.append("product", fileUpload);

    axios.post("http://localhost:8080/products/save", newProduct).then(() => {
      axios
        .post(`http://localhost:8080/upload/product/${productname}`, imageSave)
        .then((res) => {
          alert("Product successfully added");
        });
    });
  }
  return (
    <div className="main-container">
      <NavBar />
      <div className="body-container clearfix">
        <div className="n2">
          <b>Create New Product</b>
        </div>
        <form className="createform" onSubmit={sendData}>
          <div className="addproducts">
            <label for="productname">
              <b>Product Name:</b>
            </label>{" "}
            <br />
            <input
              type="text"
              id="productname"
              className="productname"
              name="productname"
              onChange={(event) => {
                setProductname(event.target.value);
              }}
              required
            />
          </div>
          <br />

          {/* <div className='photo-container'>
      <label for="photo"><b>Choose Images</b></label>  &nbsp;  
      <input type="file" accept=".png, .jpg, .jpeg" id="photo"   name="photo"  onChange={(event)=>{
          setphoto(event.target.value);
      }} />
      </div><br/> */}

          <input
            className="chooseFile"
            type="file"
            name="Choose file"
            onChange={(e) => {
              setFileUpload(e.target.files[0]);
            }}
          />
          <br />
          <br />
          <div className="productdescription">
            <label for="productdescription">
              <b> Product Description</b>
            </label>
            <br />
            <input
              type="text"
              id="productdescription"
              className="productdescription"
              name="productdescription"
              onChange={(event) => {
                setproductdescription(event.target.value);
              }}
              required
            />
            <br />
            <br />
          </div>

          <div className="time-container">
            <label for="productprice">
              <b>product Price:</b>
            </label>{" "}
            <br />
            <input
              type="text"
              id="productprice"
              className="productprice"
              name="productprice"
              onChange={(event) => {
                setproductprice(event.target.value);
              }}
              required
            />
          </div>
          <br />

          <input type="submit" id="saveBtn" value="SUBMIT"></input>
        </form>
      </div>

      <Sidebar />

      {/* update and delete */}
    </div>
  );
}
