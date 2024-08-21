import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png";

const Logo = () => {

    return (
        <div style={{ width: '200px', height: '100%', position: 'absolute', left: '0.5', top: '0.5' }}>
  <Tilt 
    glareEnable={true} 
    glareMaxOpacity={0.8} 
    glareColor="#ffffff" 
    glarePosition="bottom" 
    glareBorderRadius="20px" 
    tiltMaxAngleX={10}
    style={{ width: '100%', height: '100%' }} // Ensures Tilt takes full size of the wrapping div
  >
    <div style={{ height: '100%', width: '100%', backgroundColor: 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)' }}>
    <img src={brain} style={{paddingTop:"5px"}}alt= "logo" />
    </div>
  </Tilt>
</div>

    );
}

export default Logo;