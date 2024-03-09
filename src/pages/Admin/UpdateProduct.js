import React,{useEffect,useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from "antd"
import { useNavigate,useParams } from 'react-router-dom'
const {Option}=Select;

const UpdateProduct = () => {
    const[categories,setCategories]=useState([]);
    const [photo,setPhoto]=useState("");
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [price,setPrice]=useState("");
    const [quantity,setQuantity]=useState("");
    const [shipping,setShipping]=useState("");
    
    const [id,setId]=useState("")
    const navigate=useNavigate();
    const params=useParams();
    //single product 
    const getSingleproduct=async()=>{
        try {
          const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
          setName(data.product.name);
          setId(data.product._id)
          setDescription(data.product.description);
          setCategory(data.product.category)
          setPrice(data.product.price);
          setQuantity(data.product.quantity);
          setShipping(data.product.shipping);

           //setPhoto(`${process.env.REACT_APP_API}/api/v1/product/product-photo/${data.product._id}`) 
        } catch (error) {
            console.log(error)
            
        }
    }
    //getallcategory
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);

            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category');
        }
    }
    useEffect(() => {
        getSingleproduct();
        //enlist-disable-next-line
    }, []);
    const handleupdate=async(e)=>{
        e.preventDefault();
        try {
            const productData=new FormData()
            productData.append("name",name);
            productData.append("description",description);
            productData.append("price",price);
            productData.append("quantity",quantity);
            photo&&productData.append("photo",photo);
            productData.append("category",category._id);
            const {data}= axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,productData)
            if(data?.success){
               
                 toast.error(data?.message);
            }
            else{
                toast.success('Product updated succesfully');
                navigate('/dashboard/admin/products');
            }
        } catch (error) {
            console.log(error);
            toast.error("Some error in updating product")
        }

    }

    //delete a product
    const handleDelete=async()=>{
        try {
            let answer=window.prompt('Are you sure you want to delete the product');
            if(!answer) return;
            const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
            toast.success('Product deleted succesfully');
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }
  return (
    <Layout title="SlickRover:Admin_Create_Product">
       <div className="row">
        <div className="col-md-3 p-4">
            <AdminMenu/>
        </div>
        <div className="col-md-9 p-4">
            <h4>Update Products</h4>
            <form onSubmit={handleupdate}>
            <div className="m-1">
                <Select border={false} placeholder="Search a category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{
                    setCategory(value)
                }}
                value={category.name}>
                    {categories?.map(c=>(
                        <Option key={c._id} value={c._id}>{c.name}</Option>
                    ))}
                </Select>
                
                <div className="mb-3">
                    <label className='btn btn-outline-secondary col-md-6'>
                        {photo ? photo.name:"Upload Photo"}
                        <input type="file" name="photo" accept="image/*" onChange={(e)=>{setPhoto(e.target.files[0])}} hidden/>
                    </label>
                </div>
                <div className="mb-3">
                {photo ? (
        <div className="text-center">
             <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
            </div>
                ): 
            (<div className="text-center">
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} alt="product_photo" height={'200px'} className='img img-responsive' />
                </div>
       
              )} 
                </div> 
                <div className="mb-3">
                    <input type="text" value={name} placeholder='Enter name for product' className='form-control' onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div className="mb-3">
                    <textarea type="text" value={description} placeholder='Enter description for product' className='form-control' onChange={(e)=>{setDescription(e.target.value)}}></textarea> 
                </div>
                <div className="mb-3">
                    <input type="Number" value={price} placeholder='Enter price for product' className='form-control' onChange={(e)=>{setPrice(e.target.value)}} />
                </div>
                <div className="mb-3">
                    <input type="Number" value={quantity} placeholder='Enter quantity for product' className='form-control' onChange={(e)=>{setQuantity(e.target.value)}} />
                </div>
                <div className="mb-3">
                    <Select border={false}
                    placeholder="Select shipping"
                    size="large"
                    showSearch
                    className='form-select mb-3'
                    onChange={(value)=>{
                        setShipping(value);
                    }}
                    value={shipping? "Yes":"No"}>
                        <Option value="1">Yes</Option>
                        <Option value="0">No</Option>
                    </Select>
                </div>
                <div className="mb-3">
                    <button className='btn btn-primary'>Update Product</button>
                    
                </div>
                
            </div>
            </form>
            <button className='btn btn-danger mx-2' onClick={handleDelete}>Delete Product</button>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
