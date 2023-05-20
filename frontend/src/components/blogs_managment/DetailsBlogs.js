// /* eslint-disable no-unused-vars */
// import React, {Component} from 'react';
// import axios from 'axios';


// export default class DetailsBlogs extends Component{
//     constructor(props){
//         super(props);

//         this.state={
//             post:{}
//         };
//     }

//     componentDidMount(){
//         const id = this.props.match.params.id;

//         axios.get(`http://localhost:8080/post/${id}`).then((res) =>{
//             if(res.data.success){
//                 this.setState({
//                     post:res.data.post
//                 });
//             }
//             console.log(this.state.post);
//         });
//     }
//   render(){

//     const {blog_title,description} = this.state.post;

//     return(
//       <div style={{margin:"20px"}}>
//         <h4>{blog_title}</h4>
//         <hr/>

//         <dl className="row">
//             <dt className='col-sm-3'>Blog Title</dt>
//             <dd className='col-ma-9'>{blog_title}</dd>

//             <dt className='col-sm-3'>Description</dt>
//             <dd className='col-ma-9'>{description}</dd>
//         </dl>
        
        
//       </div>
//     )
//   }
// }