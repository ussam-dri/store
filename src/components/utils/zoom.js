import React, { useState } from 'react';

const ZoomImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="zoom-container" onClick={handleImageClick}>
      <img
        src={src}
        alt={alt}
        className={`zoomed-image ${isZoomed ? 'zoomed' : ''}`}
      />
    </div>
  );
};

export default ZoomImage;
