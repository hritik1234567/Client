import React,{useEffect,useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Product = () => {
    const [products,setProducts]=useState([]);
    const getAllProducts=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something wrong in product")
        }
    }
    useEffect(()=>{
        getAllProducts();
    },[])
  return (
    <>
    <Layout>
    <div className="row product-row">
        <div className="col-md-3 p-4">
            <AdminMenu/>
        </div> 
        <div className="col-md-9">
            <h2 className="text-center mt-2">Products List</h2>
            <div className="d-flex flex-wrap">
            {products?.map(p=>(
                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link'>
                 <div className="card m-1" style={{width: '17rem'}} >
            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
            <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
            </div>
            </div>
            </Link>
            ))}
            </div>
        </div>
        </div>  

    </Layout>
      
    </>
  )
}

export default Product
