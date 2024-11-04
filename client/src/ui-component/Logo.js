import React from 'react';
import pngLogo from '../assets/images/logo.webp';
import mobileLogo from '../assets/images/mobilelogo.webp';

const Logo = ({ isMobile }) => {
  const logoSrc = isMobile ? mobileLogo : pngLogo;
  const altText = isMobile ? 'Mobile Logo' : 'CBIT Logo';
  const width = isMobile ? 200 : 430;
  const height = isMobile ? 40 : 60;

  return (
    <img src={logoSrc} alt={altText} width={width} height={height}/>
  );
};

export default Logo;

