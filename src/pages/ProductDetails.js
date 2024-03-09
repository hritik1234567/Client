import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const ProductDetails = () => {
    const params=useParams();
    const navigate=useNavigate();
    const [product,setProduct]=useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    const getProduct=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getsimilarproduct(data?.product._id,data?.product.category._id)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    const getsimilarproduct=async(pid,cid)=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        if(params?.slug){
            getProduct();
        }
    },[params?.slug])
  return (
    <Layout>
      <div className="row container product-row">
        <div className="col-md-6 mt-5 w-30">
        <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top image-product-detail w-75 m-5"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
            <h1 className='text-center'>Product Details</h1>
            <div className='m-5'>
            <h6 style={{ fontWeight: 'normal' }}>Name: {product.name}</h6>
            <h6 style={{ fontWeight: 'normal' }}>Description: {product.description}</h6>
            <h6 style={{ fontWeight: 'normal' }}>Price: ${product.price}</h6>
            <h6 style={{ fontWeight: 'normal' }}>Category: { product?.category?.name}</h6>
            <button className="btn btn-secondary ms-1">Add to cart</button>
            </div>
            
        </div>
      </div>
      <hr />
      <div className="row product-row">
        <h3 className='text-center'>Similar Products</h3>
        <div className="d-flex flex-wrap">
  {relatedProducts?.map((p) => (
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
  </div>
    </Layout>
  )
}

export default ProductDetails
