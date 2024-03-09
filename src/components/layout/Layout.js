import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import {Toaster} from "react-hot-toast"
const Layout = (props) => {
  return (

    <>
    <Header/>
    
    <Helmet>
        <meta charSet="utf-8" />
      
  <meta name="description" content={props.description} />
  <meta name="keywords" content={props.keywords} />
  <meta name="author" content={props .author} />


        <title>{props.title}</title>
        
    </Helmet>
    
    <main style={{minHeight:"82vh"}}>
      <Toaster/>
    {props.children}
    </main>
      <Footer/>
    </>
  )
}
Layout.defaultProps={
  title:"SlickRover:Let's explore it",
  description:"Mern stack project",
  author:"Slick",
  keywords:"Mern,mongo,node,slick,rover,explore"
}

export default Layout
