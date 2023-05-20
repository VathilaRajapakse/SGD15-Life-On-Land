// import React, { useState, useEffect } from 'react';
// import {useParams,useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "../../styles/product_css/productdetails.css"
// import NavBar from "../Navbar";
// import Sidebar from "../product_management/Sidebar";

// export default function Prescr() {

//   const navigate = useNavigate();
//   const {id} = useParams("id");
//   const [productname, setpname]= useState('');
//   const [productdescription , setpd] = useState('');
//   const [productprice , setp] = useState('');


//   //read product details
//   useEffect(()=>{
//     axios.get(`http://localhost:8080/products/`+id)
//     .then((getDataa)=>{
        
//       setpname(getDataa.data.Products.productname);
//       setpd(getDataa.data.Products.productdescription);
//       setp(getDataa.data.Products.productprice);
     
//     })
// },[])

//  return (
  
//     <div className="main-container">
//     <NavBar/>
//     <div>
      
//     <div className="pcard">

      
      
//         <div className='pdetailscard'>
            
//             <div className='productnamecontainer'>
//             <label for="productname"><h5>Product Name</h5></label>  &nbsp;  <br></br>
//             <input type="text" id="productname"  value={productname}  name="productname" readOnly onChange={(event)=>{
//                 setpname(event.target.value);
//             }} required/>
//             </div><br/>

//             <div className='productdescriptioncontainer'>
//             <label for="productdescription"><h5>Product Details</h5></label>  &nbsp;  <br></br>
//             <input type="text" id="productdescription" value={productdescription} classname="productdescription" readOnly onChange={(event)=>{
//                 setpd(event.target.value);
//             }} required/>
//             </div><br/>

//             <div className='productpricecontainer'>
//             <label for="productprice"><h5>product price</h5></label>  &nbsp;  <br></br>
//             <input type="text" className="productprice" value={productprice} name="productprice" readOnly onChange={(event)=>{
//                 setp(event.target.value);
//             }} required/>
//             </div><br/>
//             </div> 
     
       

//         <br/><hr/><br/>
      
//         </div>
//         <button className='backbtn'><a href='/' style={{textDecoration:'none',color:'white'}}>BACK</a></button>
//         <button className='buybtn'><a href='/payments' style={{textDecoration:'none',color:'white'}}>BUY NOW</a></button>
//         </div>
//          <Sidebar/>
         
//     </div>
    
  
// )
// }