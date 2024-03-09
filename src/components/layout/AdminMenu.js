import React from 'react'
import { Link } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <>
    <div className="text-center">
        <h4>Admin Menu</h4>
    <div className="list-group">
 
 <Link to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</Link>
 <Link to="/dashboard/admin/create-products" className="list-group-item list-group-item-action">Create Product</Link>
 <Link to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</Link>
 <Link to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</Link>
 <Link to="/dashboard/admin/users" className="list-group-item list-group-item-action">User</Link>

 
 
</div>
    </div>
   

    </>
  )
}

export default AdminMenu
