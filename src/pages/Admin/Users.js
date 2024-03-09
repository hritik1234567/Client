import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
const Users = () => {
  return (
    <Layout title="SlickRover:Admin_Users">
      <div className="row">
        <div className="col-md-3 p-4">
            <AdminMenu/>
        </div>
        <div className="col-md-9 p-4">
            <h4>Users</h4>
        </div>
      </div>
    </Layout>
  )
}

export default Users
