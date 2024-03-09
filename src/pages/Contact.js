import React from 'react'
import Layout from '../components/layout/Layout'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
const Contact = () => {
  return (
    <Layout>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Left Section with Image */}
      <div style={{ flex: 1 }}>
        <img
          src="ecommerce_contact.jpeg"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Right Section with Text, Icons, Address, Phone Number, and Map */}
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <h2>Contact Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt ex vel
          dignissim elementum.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
          <FaMapMarkerAlt style={{ marginRight: '10px' }} />
          113,Gyan Khand,Indrapuram
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
          <FaPhone style={{ marginRight: '10px' }} />
          +91 9368176900
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
          <FaEnvelope style={{ marginRight: '10px' }} />
          Slickrover@info.in
        </div>

        {/* You can integrate a map component or embed a map from a mapping service like Google Maps here */}
        <div style={{ height: '300px', backgroundColor: '#f0f0f0', marginTop: '20px' }}>
          {/* Your map component or map embed code goes here */}
          {/* For example, you can use Google Maps embed code */}
          { <iframe
            title="Map"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.569801795873!2d77.34716517575743!3d28.642652875659326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfac94c908fc5%3A0x5c0d3162b563ff25!2s113%2C%20Gyan%20Khand%201%2C%20Indirapuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201014!5e0!3m2!1sen!2sin!4v1704626754606!5m2!1sen!2sin" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe> }
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Contact
