import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import { useParams} from "react-router-dom";
import "../../styles/navBar.css";
import "../../styles/project_css/common.css";
import "../../styles/project_css/header.css";
import "../../styles/project_css/retriveTable.css";
//import "../styles/anushka_css/stylePrescription.css"


export default function Allprojects() {
   const [volunteers, setvolunteers] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        function getVolunteer() {
       
            axios.get(`http://localhost:8080/volunteer/`)
            .then((res) => {
              console.log(res.data);
              setvolunteers(res.data.existingvolunteer);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
        getVolunteer();
      }, []);

       //delete the somthing page is reffesh
       function refreshPage(){
        window.location.reload(false);
      }

      
      //delete data
      const deleteData = (e) => {
        var result = window.confirm("Do you wont to Delete?",refreshPage());
    
        if (result == true) {
            axios
            .delete(`http://localhost:8080/volunteer/delete/${e._id}`)
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
        <div className="body-container clearfix">

            <div className="order-section-one-container ">
                <div className="order-section-one-left ">
                    
                    <h3 style={{ marginLeft: "500px", marginRight: "5px" }}>
                        Members 
                    </h3>
                   
                </div>
                
            </div>

            <div className="order-section-two-container">   
             
                <table Class = "table">
                    <thead id="app-table">

                        <tr >

                            <th className="order-table-header-col-1" scope="col">Name</th>
                            <th className="order-table-header-col-1" scope="col">Address</th>
                            <th className="order-table-header-col-1" scope="col">Contact NO</th>
                            <th className="order-table-header-col-1" scope="col">NIC</th>
                            <th className="order-table-header-col-1" scope="col">Action </th>
                            
                        </tr>

                    </thead>

                    <tbody>
                    {volunteers.map((e, index) =>(
                       
                            <tr className="order-table-row">

                          
                           
                           
                    
                            <td className="order-table-col-1">{e.fullName}</td>
                            <td className="order-table-col-1">{e.address}</td>
                            <td className="order-table-col-1">{e.contactNo}</td>
                            <td className="order-table-col-1">{e.nic}</td>
                         
                            <td id="action-button">
                            <a href="#">
                                <button id="table-button" className="btn btn-outline-danger btn-sm" onClick={() => {deleteData(e)}}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                </button>
                              </a>
                              
                             
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                
            </div>
           
        </div>
    </div>

    );
}