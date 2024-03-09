import React from 'react'
import Layout from '../components/layout/Layout'
import { Helmet } from 'react-helmet'
const About = () => {
  return (
    <Layout>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Ecommerce:SlickRover_About</title>
        
    </Helmet>
     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Left Section with Image */}
      <div style={{ flex: 1 }}>
        <img
          src="aboutus.jpeg"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Right Section with Text, Icons, Address, Phone Number, and Map */}
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt ex vell Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores, illum sapiente, porro debitis ut sunt omnis illo culpa, corporis rerum quis nulla impedit ea nam provident reprehenderit ipsa excepturi facere!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolores nemo dolore ipsum corrupti consequatur repudiandae, id eveniet, earum provident impedit error quis nisi est! Modi, voluptatem! Dolores, voluptates quam.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sequi nobis temporibus atque beatae asperiores cum suscipit et sint quos quia natus dolor dolorum voluptatem facilis assumenda. Porro, aliquid iste.</p>

        

        
        
      </div>
    </div>
    </Layout>
  )
}

export default About
