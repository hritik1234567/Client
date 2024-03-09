import React, { useEffect, useState,useRef} from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import toast from 'react-hot-toast'
const Cart = () => {
    const [auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();
    const [clientToken,setClientToken]=useState("");
    const [instance,setInstance]=useState(null);
    const [loading,setLoading]=useState(false)
    const dropInRef = useRef(null);
    const navigate=useNavigate();
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
    const totalprice=()=>{
        try {
            let total=0;
            cart?.map((item)=>{
                total=total+item.price;})
                return total.toLocaleString("en-US",{
                    style:"currency",
                    currency:"USD"
                })
            
        } catch (error) {
            console.log(error);
        }
    }
    //payment control button
   
    //get payment 
    const gettoken = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
          setClientToken(data?.clientToken);
          // Log the client token here
          localStorage.setItem("clientToken",JSON.stringify(clientToken))
          setLoading(true)
        } catch (error) {
          console.log(error);
          toast.error('Something wrong in payment token');
        }
      };
    
      useEffect(() => {
        gettoken();
      }, [auth?.token]);
      const handlePayment = async () => {
        try {
          setLoading(true);
          const { nonce } = await instance.requestPaymentMethod();
          // Make a request to your server with the payment nonce for further processing
          
          const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart });
          setLoading(false);
          localStorage.removeItem('cart');
          setCart([]);
          navigate('/dashboard/user/orders');
          toast.success('Payment is successful');
        } catch (error) {
          console.error('Error processing payment:', error);
          setLoading(false);
          // Handle the error (e.g., show an error message to the user)
        }
      };
      
  return (

    <Layout>
      <div className="container">
        <div className="row">
        <div className="md-col-12">
            <h4 className='text-center  p-2 m-2 text-light-emphasis'>

                {
                `Hello ${auth?.token&&auth.user?.name}`}
            </h4>
            <h5 className='text-center  p-2 m-2 text-light-emphasis'>
                {cart?.length>0
                ?`You have ${cart.length} items in your cart ${auth?.token? "":"Please login to checkout your cart"}`:"Your cart is Empty"}
            </h5>
        </div>
        </div>
        <div className="row">
            <div className="col-md-8">
                  {cart?.map((p)=>(
                    <div className="row mb-2 card flex-row">
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
                  ))} 
            </div>
            <div className="col-md-4 text-center">
                <h3>Cart Summary</h3>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4 className=' text-light-emphasis'>Total:{totalprice()}</h4>
                {auth?.user?.address ? (<>
                <div className="mb-3">
                    <h6>Address</h6>
                    <p>{auth?.user?.address}</p>
                    <button className='btn btn-outline-warning' onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                </div>
                </>):(
                <div className='"mb-3'>
                    {auth?.token?(
                        <button className='btn btn-outline-warning' onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                    ):(<button className='btn btn-outline-warning' onClick={()=>navigate('/login',{
                        state:'/cart'
                    })}>Please Login to checkout</button>)}
                    <div/>
                    </div>
                    
                )}
          <div className='mt-2' ref={dropInRef}>
                { !clientToken||!cart.length?(""):(
                        <>
                         <DropIn
        options={{ authorization: clientToken, paypal: { flow: 'vault' } }}
        onInstance={(newInstance) => {
            console.log('DropIn instance:', newInstance);
            setInstance(newInstance);
          }}/>

<button className='btn btn-primary' onClick={handlePayment} disabled={!loading||!instance||!auth?.user?.address}>
    {!loading?"Processing...":"Make Payment"}
</button>
                        </>
                    )
                }
        </div>

            </div>
            
           
        </div>
      </div>
      
    </Layout>
    
  )
}

export default Cart
