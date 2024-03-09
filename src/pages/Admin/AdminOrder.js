import React, { useState,useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCart } from '../../context/cart';
import moment from 'moment/moment';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
const {Option}=Select;
const AdminOrder = () => {
    const [status,setStatus]=useState(["Not Process","Processing","Shipped","Delivered","Cancelled"]);
    const [changeStatus,setChangeStatus]=useState("")
    const [orders,setOrders]=useState([]);
    const [auth,setAuth] = useAuth();
    const [cart,setCart]=useCart();
    const getAllOrders = async () => {
        try {
          
          const  {data}  = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
          
          setOrders(data?.orders);
        } catch (error) {
          console.log(error);
          toast.error("Something wrong in getting order details");
        }
      };
      const removeCartItem=(pid)=>{
        try {
            let mycart=[...cart]
            let index=mycart.findIndex((item)=>item._id===pid);
            mycart.splice(index,1);
            localStorage.setItem("cart",JSON.stringify(mycart))
            setCart(mycart);
        } catch (error) {
           console.log(error) 
        }
    }
      useEffect(() => {
        if (auth?.token) {
          getAllOrders();
        }
      }, [auth?.token]);
      const handleChange=async(orderId,value)=>{
        try {
            const  {data}  = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{status:value});
            getAllOrders();
        } catch (error) {
            console.log(error)
            toast.error("Something wrong in updating status")
        }
      }
  return (
    <Layout title={"All Orders Data"}>
      <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <h3 className='text-light-emphasis text-center'>Manage Orders</h3>
            {orders.map((o, i) => {
              return(
            <div className="border-shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th className="col">#</th>
                    <th className="col">Status</th>
                    <th className="col">Buyer</th>
                    <th className="col">Date</th>
                    <th className="col">Payment</th>
                    <th className="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><Select border={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>{status.map((s,i)=>(<Option key={i} value={s}>{s}</Option>))} </Select>
                    </td>
                      <td className="text-light-emphasis">{o?.buyer.name}</td>
                      <td className="text-light-emphasis">{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td className="text-light-emphasis">{o?.products?.length}</td>
                    </tr>
                 
                </tbody>
              </table>
              <div className="container">
                {o?.products?.map((p)=>(<div className="row mb-2 card flex-row">
                  <div className="col-md-4"> <img
      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
      className="card-img-top"
      alt={p.name}
      width="100px"
      height={160}
    /></div>
                  <div className="col-md-7">
                      <p>{p.name}</p>
                      <p className=' text-light-emphasis'>{p.description}</p>
                      <p >Price:{p.price}</p>
                      <button className='btn btn-danger mb-2' onClick={()=> removeCartItem(p._id)}>Remove</button>
                  </div>
              </div>
            ))
                }
              </div>
             
            </div>) })}
        </div>
      </div>
    </Layout>
  )
}

export default AdminOrder
