// import React, { useState, useEffect } from "react";
// import "../../styles/editcard.css";
// import Image from "../../image/Wild.png";
// import axios from "axios";
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";

// function Card(props) {
  
//   const [deleteBlog, setDeleteBlog] = useState(false);
//   const [blogToDelete, setBlogToDelete] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   // const userName = localStorage.getItem('userName');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(`http://localhost:8080/posts/`);
//         console.log(response.data);
//         setBlogs(response.data.existingPosts);
//       } catch (err) {
//         alert(err.message);
//       }
//     }
//     fetchData();
//   }, []);

//   // refresh page
//   function refreshPage() {
//     window.location.reload(false);
//   }

//   function handleDeleteBlog(blog) {
//     setBlogToDelete(blog);
//     setDeleteBlog(true);
//   }

//   // delete data
//   const confirmDeleteBlog = () => {
//     axios
//       .delete(`http://localhost:8080/post/delete/${blogToDelete._id}`)
//       .then(() => {
//         setDeleteBlog(false);
//         if (props.onDelete) {
//           props.onDelete(blogToDelete._id);
//         }
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   };

//   return (
//     <div>
//       <div className="card-container-edit">
//         <div className="image-container">
//           <img src={Image} alt="image" className="image" />
//         </div>              
//         <div className="action-container">
//         <button onClick={() => props.onEdit && props.onEdit(props)}>Update</button>
//           <button onClick={() => handleDeleteBlog(props)}>Delete</button>     
//           <Dialog open={deleteBlog} onClose={() => setDeleteBlog(false)}>
//             <DialogTitle>Warning!</DialogTitle>
//             <DialogContent>
//               Are you sure you want to delete the blog?
//             </DialogContent>
//             <DialogActions>
//               <Box sx={{ m: 1, position: "relative" }}>
//                 <Button variant="contained" onClick={() => confirmDeleteBlog()} autoFocus color="secondary">
//                   Confirm
//                 </Button>
//               </Box>
//             </DialogActions>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;
