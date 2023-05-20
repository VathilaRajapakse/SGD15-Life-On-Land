/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";

import "../../styles/product_css/editproducts.css";

export default function EditProducts() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productname, setpro] = useState("");
  const [productdescription, setprod] = useState();
  const [productprice, setpr] = useState();
  const [fileUpload, setFileUpload] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/` + id).then((getData) => {
      setpro(getData.data.Products.productname);
      setprod(getData.data.Products.productdescription);
      setpr(getData.data.Products.productprice);
    });
  }, []);
  console.log(productname);

  const sendDataToAPI = () => {
    const data = { productname, productdescription, productprice };
    axios
      .put(`http://localhost:8080/products/update/${id}`, data)
      .then((res) => {
        alert("Update Successfull");
        navigate(-1);
      })
      .catch((err) => {
        alert("Update Unsuccessfull");
      });
        if (fileUpload) {
      const imageSave = new FormData();
      imageSave.append("product", fileUpload);

      {
        axios
          .post(
            `http://localhost:8080/upload/product/${productname}`,
            imageSave
          )
          .then(() => {});
      }
    }
  };

  return (
    <div className="main-container">
      <NavBar />

      <div id="createlab" class="card-body bg-light">
        <h1>EDIT PRODUCT</h1>
        <div className="card">
          <div className="col-md-8 mx-auto">
            <form id="products" className="editproducts">
              <div className="productname" style={{ marginBottom: "35px" }}>
                <label style={{ marginBottom: "5px" }}>PRODUCT NAME</label>
                <input
                  type="text"
                  className="form-control"
                  name="productname"
                  placeholder="Enter Product Name"
                  value={productname}
                  onChange={(e) => setpro(e.target.value)}
                  required
                />
              </div>
              <input
                className="chooseFile"
                type="file"
                name="Choose file"
                onChange={(e) => {
                  setFileUpload(e.target.files[0]);
                }}
              />
              <div
                className="productdescription"
                style={{ marginBottom: "25px" }}
              >
                <label style={{ marginBottom: "5px" }}>
                  PRODUCT DESCRIPTION
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="productdescription"
                  placeholder="Enter Product Description"
                  value={productdescription}
                  onChange={(e) => setprod(e.target.value)}
                  required
                />
              </div>
              <div className="productprice" style={{ marginBottom: "25px" }}>
                <label style={{ marginBottom: "5px" }}>PRODUCT PRICE</label>
                <input
                  type="text"
                  className="form-control"
                  name="productprice"
                  placeholder="Enter Product Price"
                  value={productprice}
                  onChange={(e) => setpr(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
        </div>
        <br></br>
        <button
          className="sbtn2"
          type="submit"
          id="myBtn2"
          style={{ marginTop: "1px" }}
          onClick={sendDataToAPI}
        >
          <i className="far fa-check-square"></i>
          &nbsp; EDIT DETAILS
        </button>
      </div>
      <Sidebar />
    </div>
  );
}
