import React from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';
const Categories = () => {
    const categories=useCategory();
  return (
    <Layout title={'Categories:For All'}>
      <div className="container">
        <div className="row">
            
                {categories?.map((c)=>(
                    <div className="col-md-6 mt-5 mb-5 gx-3 gy-3" key={c._id}>
                    <button className='btn btn-primary m-2'>
                        <Link to={`/category/${c.slug}`} className='btn btn-primary '>
                        {c.name}</Link>
                    </button>
                    </div>
                ))}
            </div>
        
      </div>
    </Layout>
  )
}

export default Categories
