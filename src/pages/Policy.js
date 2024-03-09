import React from 'react'
import Layout from '../components/layout/Layout'
import { SiGnuprivacyguard } from "react-icons/si";

const Policy = () => {
  return (
    <Layout>
      <div>
      <header style={{ backgroundColor: 'grey', color: '#fff', padding: '10px',display:"flex",justifyContent:"center"}}>
        
        <h5><SiGnuprivacyguard /></h5>
        
        <h4>SlickRover Privacy Wonderland </h4>
        
        
      </header>

      <main style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <h4>Your Data, Your Symphony</h4>
        <p>At SlickRover, we collect just the right notes to create a seamless shopping symphony tailored for you.</p>

        <h6>1. Personal Harmony:</h6>
        <ul>
          <li>Elevate your experience with your full name.</li>
          <li>Stay in touch using your email address and phone number.</li>
          <li>We only peek at your payment info when it's time to make the magic happen.</li>
        </ul>

        <h6>2. Rhythm of Usage:</h6>
        <ul>
          <li>Discover the beats of your browsing history.</li>
          <li>Know your device vibes (type, model, operating system).</li>
          <li>Keep things secure with your unique IP address.</li>
        </ul>

        <h6>3. Cookies - The Sweet Harmony Makers:</h6>
        <ul>
          <li>Indulge in the sweet taste of cookies for a personalized experience.</li>
          <li>They help us analyze trends and tailor our stage to your liking.</li>
        </ul>

        <h4>The Grand Performance - How We Use Your Data</h4>
        <p>Backstage, we use your data to create a grand performance that's all about you:</p>

        <h6>1. Order Serenade:</h6>
        <ul>
          <li>We make your orders sing, from processing payments to delivering your spotlight-worthy items.</li>
        </ul>

        <h6>2. Encore Customer Support:</h6>
        <ul>
          <li>Need assistance? Our customer support is ready to take center stage and resolve any issues.</li>
        </ul>

        <h6>3. Improving the Show:</h6>
        <ul>
          <li>Analyzing the audience's vibes helps us improve our acts and customize your experience.</li>
        </ul>

        <h6>4. Marketing Crescendo:</h6>
        <ul>
          <li>Get front-row access to promotions (you can opt-out anytime).</li>
          <li>Personalized marketing content that's music to your ears.</li>
        </ul>

        <h4>The Orchestra - Information Sharing</h4>
        <p>Our orchestra is a close-knit group, and your data is in safe hands. We share only with trusted service providers who help us tune our instruments for a flawless performance.</p>

        <h4>Security - Fort Knox for Your Data</h4>
        <p>Think of us as the Fort Knox of online shopping. We've implemented top-tier security measures to protect your data. While we can't promise 100% security (who can?), we're doing our best to make sure your data dances under the brightest spotlights.</p>

        <h4>Your Solo - Choices</h4>
        <p>You're in control of your solo. Here are your choices:</p>
        <ul>
          <li>Fine-tune your personal information.</li>
          <li>Choose the beats that reach your inbox (opt-out anytime).</li>
          <li>If you're ready for a different stage, delete your account (but we'll miss you!).</li>
        </ul>

        <h4>Encore - Changes to Our Symphony</h4>
        <p>Our symphony is ever-evolving. When we add a new instrument or change the tempo, we'll let you know by updating this sheet. Look for the latest notes and when they were composed.</p>
        <h4> Changes to This Policy</h4>

<p>We may update this Privacy Policy as needed. Check the "Last Updated" date to be aware of any changes.</p>


<h4>Contact Us</h4>
<p>If you have questions or concerns about our Privacy Policy, please contact us at [slickrover@gmail.com].</p>
      </main>
    </div>
    </Layout>
  )
}

export default Policy
