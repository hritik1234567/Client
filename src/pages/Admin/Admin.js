import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'
const Admin = () => {
  const [auth]=useAuth();
  return (
    <Layout>
       <div className="container-fluid">
        <div className="row m-2">
          <div className="col-md-3 p-4">
            <h4 className='text-center'>Admin panel</h4>
            <AdminMenu/>
          </div>
          <div className="col-md-9 p-4">
           <div className="card w-75 p-3">
            <h4>Admin Name:{auth?.user?.name}</h4>
            <h4>Admin Name:{auth?.user?.email}</h4>
            <h4>Admin Name:{auth?.user?.address}</h4>
           </div>
          </div>
        </div>
       </div>
    </Layout>
      
   
  )
}

export default Admin
