import React, { useState ,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Button, Modal } from 'antd';
import { Footer } from 'antd/es/layout/layout'
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name,setName]=useState("");
    const [visible,setVisible]=useState(false);
    const [selected,setSelected]=useState(null);
    const [updateName,setUpdateName]=useState("");
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{
                name,
            });
            if(data?.success){
                toast.success(`New category is created`);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wrong in creating new category");
        }
    }
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);

            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category');
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);
    const updatesubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updateName})
            if(data?.success){
                toast.success(`Category is Updated`);
                setSelected(null);
                setUpdateName("");
                setVisible(false);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wrong in updating category")
        }
    }
    const handledelete=async(cid)=>{
       
        try {
            const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${cid}`)
            if(data?.success){
                toast.success(`Category is Deleted`);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wrong in deleting category")
        }
    }
  return (
    <Layout title="SlickRover:Admin_Create_Category">
       <div className="row">
        <div className="col-md-3 p-4">
            <AdminMenu/>
        </div>
        
        <div className="col-md-9 p-4">
        <h4>Manage Category</h4>
        <div className="p-3 ">
            <CategoryForm
            handleSubmit={handlesubmit}
            value={name}
            setValue={setName}
            />
        </div>
            
<div className='w-75'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    
  {categories?.map((c) => (
    <tr key={c._id}>
        <td>{c.name}</td>
        <td>
            <button className='btn btn-primary' onClick={()=>{setVisible(true);setUpdateName(c.name);setSelected(c)}}>Edit</button>
            <button className='btn btn-danger mx-2' onClick={()=>{handledelete(c._id)}}>Delete</button>
        </td>
    </tr>
))}
    
  </tbody>
</table>

            </div>
            <Modal  open={visible} footer={null} onCancel={()=>setVisible(false) }>
                <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={updatesubmit}/>
            </Modal>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
