import React,{useEffect, useState} from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/auth';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import UserMenu from '../../components/layout/UserMenu'

const Profile = () => {
  const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [auth,setAuth]=useAuth();
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    
    const handlesubmit=async(e)=>{
      e.preventDefault();
     try {
         const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{
             name,
             email,
             phone,
             address,
            
         }); 
         if(data?.error){
             toast.error(data?.message);}
         else{
             setAuth({...auth,user:data?.updatedUser})
             let ls=localStorage.getItem("auth");
             ls=JSON.parse(ls);
             ls.user=data.updateduser
             localStorage.setItem('auth',JSON.stringify(ls))
             toast.success('Profile updated succesfully');
         }
     } catch (error) {
         console.log(error);
         toast.error("Something went wrong");
     }
      }
      useEffect(() => {
        const { name, email, phone, address } = auth.user;
        setName(name);
        setPhone(phone);
        setAddress(address);
        setEmail(email);
      }, [auth.user, setName, setPhone, setAddress, setEmail]);
      
  return (
    <Layout>
    <div className="container-fluid "></div>
    <div className="row product-row">
        <div className="col-md-3">
          <h3 className='text-center'>User Menu</h3>
            <UserMenu/>
        </div>
        <div className="col-md-9  product-row">
        <div className='register'>
        <h2>User Profile</h2>
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={name} onChange={(e)=>setName(e.target.value)} required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} required disabled />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPhone" className="form-label">Phone Number</label>
    <input type="Number" className="form-control" id="exampleInputPhone" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputAddress" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
  </div>
  
    
  <button type="submit" className="btn registerbtn">Update</button>
</form>
</div>
        </div>
    </div>
</Layout>
  )
}

export default Profile
