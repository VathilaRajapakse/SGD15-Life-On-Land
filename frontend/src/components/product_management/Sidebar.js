/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";

//import "../../styles/product_css/sidebar.css";
import "../../styles/navBar.css"

export default function SideBar() {
  return (
    <div className="nav_main_container">
    <div className="pside_main_container">
      <div className="pside_header">
        <p className="pside_heading_text">
          BE THE CHANGE
        </p>
      </div>
      <p className="hi">
        HelpNature offers PET collection and has many local collection centers
        around Sri Lanka
      </p>
      <br/>
      <div className="pmap_card">
        <iframe
          width="275"
          height="480"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"        
          id="gmap_canvas"
          src="https://maps.google.com/maps?width=250&amp;height=500&amp;hl=en&amp;q=recycling%20center%20colombo%20+(Recycling%20Centers)&amp;t=p&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
        <a href="https://maps-generator.com/"></a>
      </div>
    </div>
    </div>
  );
}
