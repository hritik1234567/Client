import React,{useState} from 'react'
import Layout from '../../components/layout/Layout'

import { IoPerson } from "react-icons/io5"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();
    const location=useLocation()
 const handlesubmit=async(e)=>{
 e.preventDefault();
try {
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{
        
        email,
        password,
        
    }); 
    if(res.data.success){
       
        toast.success(res.data&&res.data.message);
        setAuth({
            ...auth,user:res.data.User,
            token:res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
          navigate(location.state||'/');
        
       
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
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
  </div>
  
    <div className='d-grid gap-2'>
    
  <button type="submit" className="btn loginbtn">Login</button>
  <button type="submit" className="btn loginbtn" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
  </div>
</form>

</div>

    </Layout>
    </>
  )
}

export default Login
