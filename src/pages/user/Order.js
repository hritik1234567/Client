import React,{useEffect,useState} from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCart } from '../../context/cart';
import moment from 'moment/moment';
import { useAuth } from '../../context/auth';
const Order = () => {
  const [orders,setOrders]=useState([]);
  const [cart,setCart]=useCart();
  
  const [auth,setAuth] = useAuth();
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
  const getOrders = async () => {
    try {
      
      const  {data}  = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      
      setOrders(data?.orders);
    } catch (error) {
      console.log(error);
      toast.error("Something wrong in getting order details");
    }
  };
  
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);
  
  
  return (
    <Layout>
        <div className="container"></div>
        <div className="row product-row">
            <div className="col-md-3">
              <h4 className='text-center'>User Menu</h4>
                <UserMenu/>
            </div>
            <div className="col-md-9">
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
                      <td>{o?.status}</td>
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

export default Order
 