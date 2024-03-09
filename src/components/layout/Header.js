import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/cart'
import toast from 'react-hot-toast'
import { IoPerson } from "react-icons/io5"
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import {Badge} from 'antd'
const Header = () => {
  const [auth,setAuth]=useAuth();
  const [cart]=useCart();
  const navigate=useNavigate();
  const categories=useCategory();
  const handleLogout = () => {
    // Perform logout logic
    // Clear localStorage or perform any other necessary actions
    
    setAuth({
      ...auth,user:null,token:'',
    })
    
    localStorage.removeItem("auth");
    // Redirect to the login page or any other desired destination
   navigate('/login');
   toast.success('Logout successfully');
  };
  return (

    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">👜SlickRover
    
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <SearchInput/>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to={"/categories"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Categories
          </Link>
        <ul className="dropdown-menu">
        <li><Link className="dropdown-item" to={"/categories"}>All Categories</Link></li>
          {categories?.map((c)=>(
             <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
          ))}
          </ul>
          </li>
         {!auth.user?(<>
         
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/login" >Login</Link>
        </li>
        </>):(<>
          <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/category" role="button" data-bs-toggle="dropdown" aria-expanded="false">
       <IoPerson/>{auth?.user?.name}
          </Link>
          <ul className="dropdown-menu">
          <li className="nav-item">
          <Link className="dropdown-item" aria-current="page" to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}>Dashboard</Link>
        </li>
          <li className="nav-item">
          <Link className="dropdown-item" aria-current="page" to="/login" onClick={handleLogout}>Logout</Link>
        </li>
          </ul>
        </li>
        
       
        </>) }
        <li className="nav-item" style={{ display: 'flex', alignItems: 'center'}}>
      
  <Badge count={cart?.length} style={{ marginRight: '10px' }}>
  <Link className="nav-link" aria-current="page" to="/cart" style={{ fontSize:"16px"}}>Cart</Link>
    </Badge>
          
        </li>
        
        
        
      </ul>
    
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
