import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className="footer">
    <h6 className='text-center pt-2'>  &copy; 2024 SlickRover. All rights reserved.</h6>
    <p className="text-center mt-3">
      <Link to="/about">About</Link>|
      <Link to="/policy">Privacy Policy</Link>|
      <Link to="/contact">Contact</Link>
    </p>
    </div>
     
    </>
  )
}

export default Footer
