
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import Private from './components/Routes/Private';
import Forgetpassword from './pages/auth/Forgetpassword';
import AdminRoute from './components/Routes/AdminRoute';
import Admin from './pages/Admin/Admin';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Order from './pages/user/Order';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Cart from './pages/Cart';
import AdminOrder from './pages/Admin/AdminOrder';


function App() {
  return (
    <>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/product/:slug" element={<ProductDetails/>}/>
    <Route path="/categories" element={<Categories/>}/>
    <Route path="/category/:slug" element={<CategoryProduct/>}/>
    <Route path="/dashboard" element={<Private/>}>
    <Route path="user" element={<Dashboard/>}/>
    <Route path="user/profile" element={<Profile/>}/>
    <Route path="user/orders" element={<Order/>}/>
    </Route>
    <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<Admin/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-products' element={<CreateProduct/>}/>
      <Route path='admin/users' element={<Users/>}/>
      <Route path='admin/products' element={<Product/>}/>
      <Route path='admin/orders' element={<AdminOrder/>}/>
      <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
    </Route>
    <Route path="/about" element={<About/>}/>
    <Route path="/forgot-password" element={<Forgetpassword/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/policy" element={<Policy/>}/>
    <Route path="/pagenotfound" element={<Pagenotfound/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/cart" element={<Cart/>}/>
    
  </Routes>
      
    </>
  );
}

export default App;
