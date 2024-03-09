import React,{useState} from 'react'
import Layout from '../../components/layout/Layout'

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [answer,setAnswer]=useState("");
    const navigate=useNavigate();
 const handlesubmit=async(e)=>{
 e.preventDefault();
try {
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{
        name,
        email,
        password,
        phone,
        address,
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
    <Layout>
        <Toaster/>
        <div className='register'>
        <h2>Register</h2>
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={name} onChange={(e)=>setName(e.target.value)} required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} required />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPhone" className="form-label">Phone Number</label>
    <input type="Number" className="form-control" id="exampleInputPhone" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputAddress" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAnswer" className="form-label">Favoirte Sport</label>
    <input type="text" className="form-control" id="exampleInputAnswer" value={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
  </div>
    
  <button type="submit" className="btn registerbtn">Submit</button>
</form>
</div>

    </Layout>
  )
}

export default Register
