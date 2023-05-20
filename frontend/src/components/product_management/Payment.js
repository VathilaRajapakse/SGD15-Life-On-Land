import React, { useState, useEffect } from "react";
// import React, {Component} from 'react';
import axios from "axios";
import "../../styles/product_css/payment.css";
import NavBar from "../Navbar";
import Sidebar from "../product_management/Sidebar";

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

  return (
    <div className="main-container">
      <NavBar />

      <div>
        <div className="payment-form">
          <div className="p-form">
            <div>
              <label htmlFor="cardOwner">Card Owner:</label>
              <input type="text" id="cardOwner" />
            </div>

            <div>
              <label htmlFor="cvv">CVV:</label>
              <input type="text" id="cvv" />
            </div>

            <div>
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input type="text" id="expirationDate" />
            </div>

            <button type="submit">Confirm</button>
            
          </div>
        </div>
      </div>

      <Sidebar />
    </div>
  );
}
