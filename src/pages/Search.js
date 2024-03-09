import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues]=useSearch();
  return (
    <Layout title={'Search SlickRover'}>
      <div className="container">
        <div className="text-center">
            <h2>Search Results</h2>
            <div className="d-flex flex-wrap">
  {values?.results.map((p) => (
    <div className="card m-1 product-card" style={{ width: '18rem' }} key={p._id}>
      
        
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
            className="card-img-top"
            alt={p.name}
          />
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">{p.description}</p>
            <p className="card-text">${p.price}</p>
            <button className="btn btn-secondary ms-1">Add to cart</button>
            <button className="btn btn-primary ms-1">More Details</button>
          </div>
      
      
    </div>
  ))}
</div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
