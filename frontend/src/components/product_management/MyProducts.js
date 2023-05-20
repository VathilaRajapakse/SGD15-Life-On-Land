import React, { useState, useEffect } from "react";
// import React, {Component} from 'react';
import axios from "axios";
import "../../styles/product_css/myproducts.css";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";

import Card from "../product_management/Pcard2";

function refreshPage() {
  window.location.reload(false);
}

export default function Pro() {
  const [products, setproducts] = useState([]);

  //  const {id} = useParams();

  useEffect(() => {
    function getproducts() {
      axios
        .get(`http://localhost:8080/products/`)
        .then((res) => {
          console.log(res.data);
          setproducts(res.data.existingProducts);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getproducts();
  }, []);

  //delete
  const deleteData = (e) => {
    var result = window.confirm("Do you wont to Delete?", refreshPage());

    if (result == true) {
      axios
        .delete(`http://localhost:8080/products/delete/${e._id}`)
        .then((res) => {})
        .catch((e) => {
          alert(e);
        });
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className="main-container">
      <NavBar />
      

      <div className="product-cards">
      <h3 className="title-name" style={{ fontWeight: "bold"}} >
            MY PRODUCTS
          </h3>
        <div className="card-track-product">
        
          {products.map((e, index) => (
            <div>
              <Card
                productname={e.productname}
                productdescription={e.productdescription}
                productprice={e.productprice}
                id={e.id}
              />
              <a className="btn btn-warning" href={`/productedit/${e._id}`}>
                <i className="fas fa-edit"></i>EDIT
              </a>
              &nbsp;&nbsp;
              <a href="#">
                <button
                  id="table-button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    deleteData(e);
                  }}
                >
                  <i className="fas fa-trash-alt"></i>&nbsp;Delete
                </button>
              </a><br/>
            </div>
          ))}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
