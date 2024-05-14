
import React from 'react';
import mobileLogo from '../assets/images/mobilelogo.png';

const MobileLogo = () => {
  const width = 330;
  const height = 95;

  return (
    <img src={mobileLogo} alt="Mobile Logo" width={width} height={height}/>
  );

  // This code is unreachable and should be removed or commented out
  // console.log('This code is unreachable');
};

export default MobileLogo;
