import React, {useState} from 'react';
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import CreateBlogs from './components/blogs_managment/CreateBlogs';
import DetailsBlogs from './components/blogs_managment/DetailsBlogs';
import EditBlogs from './components/blogs_managment/EditBlogs';
import Home from './components/blogs_managment/Home';
import BlogView from './components/blogs_managment/BlogView';
import Registration from './components/registration';
import Login from './components/bloglogin';
// import NavBar from './components/NavBar';
import Protected from './components/auth/protected';
import AllBlog from './components/blogs_managment/AllBlog'



//project management
import Volunter from './components/project_management/Volunter';
import Allproject from './components/project_management/Allprojects';
import Addproject from './components/project_management/Addproject';
import VForm from './components/project_management/VForm';
import PUpdate from './components/project_management/updatepro'


//product management
import AddProducts from './components/product_management/AddProducts';
import EditProducts from './components/product_management/EditProducts';
import MyProducts from './components/product_management/MyProducts';
import ProductDetails from './components/product_management/ProductDetails';
import Pcard from './components/product_management/Pcard';
import Products from './components/product_management/Products';
import Payment from './components/product_management/Payment';


//post management
import CreatePost from './components/post_management/createPost';
import Update from './components/post_management/updatePost';
// import Allpost from './components/post_management/Allpost';
import HomePost from './components/post_management/homePost';
import MyPosts from './components/post_management/myPosts';
//import Login from './components/Login';
//import Registration from './components/registration';
import PostView from './components/post_management/postView';



export default function App(){
 
    return(
      <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/blog/add"  element={<Protected><CreateBlogs/></Protected>}></Route>
          <Route path="/edit/:id"  element={<EditBlogs/>}></Route>
          <Route path="/post/:id"  element={<DetailsBlogs/>}></Route>
          {/* <Route path="/details" element={<BlogView/>}></Route> */}
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/Login" element ={<Login/>}></Route>
          <Route path="/AllBlog" element ={<AllBlog/>}></Route>


              {/* project management */}
              <Route path="/Volunter" element={<Volunter/>}></Route>            
              <Route path="/ProAll" element={<Allproject/>}></Route>
              <Route path="/proadd" element={<Addproject/>}></Route>
              <Route path="/vform" element={<VForm/>}></Route>
              <Route path="/PUpdate/:id" element={<PUpdate/>}></Route>

              {/* product management */}
              <Route path="/Products" element={<Products/>}></Route>
              <Route path="/add" element={<AddProducts/>}></Route>
              <Route path="/productedit/:id" element={<EditProducts/>}></Route>
              <Route path="/det/:id" element={<ProductDetails/>}></Route>
              <Route path="/myproducts" element={<MyProducts/>}></Route>
              <Route path="/payments" element={<Payment/>}></Route>


              <Route path="/car" element={<Pcard/>}></Route>


              {/* post management */}
              <Route path="/home" element={<HomePost/>} />
              {/* <Route path="/" element={<Login/>} /> */}
              <Route path="/All" element={<CreatePost/>} />
              <Route path="/update/:id" element={<Update/>} />
              <Route path="/changes" element={<MyPosts/>} />
              {/* <Route path="/registration" element={<Registration/>}></Route> */}
              <Route path="/sidebar" element={<PostView/>}></Route>


        </Routes>

      </BrowserRouter>
    )
  
}