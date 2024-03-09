import React,{useEffect,useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from "antd"
import { useNavigate } from 'react-router-dom'
const {Option}=Select;
const CreateProduct = () => {
    const[categories,setCategories]=useState([]);
    const [photo,setPhoto]=useState("");
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [price,setPrice]=useState("");
    const [quantity,setQuantity]=useState("");
    const [shipping,setShipping]=useState("");
    const navigate=useNavigate();
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
        getAllCategory();
    }, []);
    const handlecreate=async(e)=>{
        e.preventDefault();
        try {
            const productData=new FormData()
            productData.append("name",name);
            productData.append("description",description);
            productData.append("price",price);
            productData.append("quantity",quantity);
            productData.append("photo",photo);
            productData.append("category",category);
            const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productData)
            if(data?.success){
                toast.success('Product created succesfully');
                 navigate('/dashboard/admin/products');

            }
            else{
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Some error in creating product")
        }

    }
  return (
    <Layout title="SlickRover:Admin_Create_Product">
       <div className="row">
        <div className="col-md-3 p-4">
            <AdminMenu/>
        </div>
        <div className="col-md-9 p-4">
            <h4>Products</h4>
            <form onSubmit={handlecreate}>
            <div className="m-1">
                <Select bordered={false} placeholder="Search a category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{
                    setCategory(value)
                }}>
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
                    {photo&& (
                        <div className="text-center">
                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
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
                    <Select bordered={false}
                    placeholder="Select shipping"
                    size="large"
                    showSearch
                    className='form-select mb-3'
                    onChange={(value)=>{
                        setShipping(value);
                    }}>
                        <Option value="1">Yes</Option>
                        <Option value="0">No</Option>
                    </Select>
                </div>
                <div className="mb-3">
                    <button className='btn btn-secondary'>Create Product</button>
                </div>
                
            </div>
            </form>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
