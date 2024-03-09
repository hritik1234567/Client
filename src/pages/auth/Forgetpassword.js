
import React,{useState} from 'react'
import Layout from '../../components/layout/Layout'

import { IoPerson } from "react-icons/io5"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
const Forgetpassword = () => {
    const [email,setEmail]=useState("");
    const [newpassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("");
    const navigate=useNavigate();
    const location=useLocation()
 const handlesubmit=async(e)=>{
 e.preventDefault();
try {
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`,{
        
        email,
        newpassword,
        answer
        
    }); 
    if(res.data.success){
       
        toast.success(res.data&&res.data.message);
       
       
          navigate('/login');
        
       
    }
    else{
        toast.error(res.data.message);
    }
} catch (error) {
    console.log(error);
    toast.error("Something went wrong");
}
 }
  return (
    <>
    <Layout>
      
      <div className='login'>
      
  <form onSubmit={handlesubmit}>
  
  <h2><p><IoPerson /></p>Login</h2>
<div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} required />
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
  <label htmlFor="exampleInputnewPassword1" className="form-label">New Password</label>
  <input type="password" className="form-control" id="exampleInputnewPassword1" value={newpassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
</div>
<div className="mb-3">
  <label htmlFor="exampleInputAnswer1" className="form-label">Answer for Validation</label>
  <input type="text" className="form-control" id="exampleInputAnswer1" value={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
</div>
  
<button type="submit" className="btn loginbtn" onClick={handlesubmit}>Update</button>
</form>
</div>

  </Layout>
  </>
  )
}

export default Forgetpassword
