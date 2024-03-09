import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useParams} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const CategoryProduct = () => {
    const [products,setProducts]=useState([]);
    const [category,setCategory]=useState("");
    const [page,setPage]=useState(1);
    const [total,setTotal]=useState(0);
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const navigate=useNavigate();
    const totalcount=async()=>{
        try {
          const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
          setTotal(data?.count);
      } catch (error) {
          console.log(error);
          toast.error("Something wrong in product")
      }
      }
    const getproductbycategory=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(params?.slug) getproductbycategory();
    },[params?.slug])
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
  return (
    <Layout>
      <h5 className='text-center m-2'>{category.name}</h5>
      <div className="d-flex flex-wrap justify-content-evenly">
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
            <button className="btn btn-secondary ms-1">Add to cart</button>
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
    </Layout>
  )
}

export default CategoryProduct
