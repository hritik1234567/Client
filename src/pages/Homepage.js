import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'

import {Checkbox,Radio} from 'antd';
import { Prices } from '../components/Price'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'
const Homepage = () => {
  const [auth,setAuth]=useAuth();
  const [cart,setCart]=useCart();
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
const navigate=useNavigate();
//
const totalcount=async()=>{
  try {
    const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
    setTotal(data?.count);
} catch (error) {
    console.log(error);
    toast.error("Something wrong in product")
}
}
  //
  const getAllProducts=async()=>{
    try {
        setLoading(true);
        const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
        setProducts(data?.products);
        setLoading(false);
    } catch (error) {
      setLoading(false);
        console.log(error);
        toast.error("Something wrong in product")
    }
}
//load more

const loadmore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
    const newProducts = data?.products || [];

    // Filter out products with undefined _id
    const validProducts = newProducts.filter((p) => p._id);

    setProducts([...products, ...validProducts]);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error("Something wrong in product");
  }
};

useEffect(() => {
  console.log("Loadmore useEffect triggered");
  if(page===1) return ;
loadmore()
},[page] ); 


const getAllCategory = async () => {
  try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);

      if (data.success) {
          setCategories(data.category);
      }
  } catch (error) {
      console.log(error);
      
  }
}
const handleRadioChange = (e) => {
  // Set the radio state when the value changes
  setRadio(e.target.value);
};
const handleFilter=(value,id)=>{
  let all=[...checked];
  if(value){
    all.push(id);
  }
  else{
    all=all.filter((c)=>c!==id)
  }
  setChecked(all);
}
const filterproduct=async()=>{
  try {
    const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`,{checked,radio})
    setProducts(data?.products);
  } catch (error) {
    console.log(error)
    toast.error("Something happens wrong in filtering product")
  }
}
useEffect(() => {
  getAllCategory();
  totalcount();
},[] );  
   
useEffect(()=>{
  if(!checked.length||!radio.length){
  getAllProducts();}
},[checked.length,radio.length])
//Filter function

useEffect(()=>{
  if(checked.length||radio.length){
    filterproduct();
  }
},[checked,radio])
  return (
    <Layout title={"All products-Best offers"}>
      <div className="row product-row">
        <div className="col-md-2">
        <h5 className="text-center">Filter by Category</h5>
        <div className="d-flex flex-column m-3">
        {categories?.map(c => (
  <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>
    {c.name}
  </Checkbox>
))}
        </div>
        <h5 className="text-center">Filter by Price</h5>
        <div className="d-flex flex-column m-3">
          <Radio.Group onChange={handleRadioChange} value={radio}>
            {Prices?.map(p=>(
              <div key={p._id}>
              <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          <button className='btn btn-danger' onClick={()=>window.location.reload()}>Clear Filters</button>
        </div>
        </div>
        <div className="col-md-10">
          <h2 className="text-center">
            All Products </h2>
            <div className="d-flex flex-wrap">
  {products?.map((p) => (
    <div className="card m-1 product-card" style={{ width: '18rem' }} key={p._id}>
      
        
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
            className="card-img-top"
            alt={p.name}
          />
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">{p.description}</p>
            <p className="card-text">${p.price}</p>
            <button className="btn btn-secondary ms-1" onClick={()=>{setCart([...cart,p]);
            localStorage.setItem("cart",JSON.stringify([...cart,p]))
              toast.success("Product added to cart");}} >Add to cart</button>
            <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
          </div>
      
      
    </div>
  ))}
</div>
          <div className="m-2 p-3">
            {products&&products.length<total&&(
            <button className='btn btn-primary' 
            onClick={(e)=>{e.preventDefault();
            setPage(page+1)}}>
                {loading? 'Loading...':"Loadmore"}
            </button>
            )}
          </div>
        </div>
      </div>
      
    </Layout>
  )
}

export default Homepage
