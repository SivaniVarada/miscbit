// MobileLogo.js

import React from 'react';
import mobileLogo from '../assets/images/mobilelogo.webp';

const MobileLogo = () => {
  const width = 200;
  const height = 60;

  return (
    <img src={mobileLogo} alt="Mobile Logo" width={width} height={height}/>
  );

  // This code is unreachable and should be removed or commented out
  // console.log('This code is unreachable');
};

export default MobileLogo;
