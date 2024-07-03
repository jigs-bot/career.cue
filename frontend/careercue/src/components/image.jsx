import React from 'react';


const Image = ({ alt, className, height, src, width }) => {
  return (
    <img
      alt={alt}
      className={className}
      height={height}
      src={src}
      width={width}
    />
  );
};

export default Image;