import React from "react";
import './Footer.css'
function Footer(){
    return(
        <div className="Footer">
        <img src='/logo.png' alt='logo' />
        <div className="footer-contact">
       <a href="mailto:support@example.com"><button>Contact Us</button></a> 
     
      </div>
      <hr className="hrrule" />
      <p className="bottom-txt">Made By prvnX</p>
      <p className="bottom-txt2">© 2024 ArcadiaX. All rights reserved.</p>
    </div>
    )
}
export default Footer;