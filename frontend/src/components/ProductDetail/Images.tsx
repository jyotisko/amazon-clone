import React, { useState } from 'react';
import { ProductResponseType } from '../../types/APIResponseTypes';

interface ImagesProps {
  product: ProductResponseType;
};

const Images: React.FC<ImagesProps> = ({ product }) => {
  const allImages = [product.imageMain, ...product.imageAlternates!];
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div className="product-images">
      <div className="product-images__alt">
        {
          allImages.map((image, index) => <img key={index} className='images__alt' onMouseEnter={() => setCurrentImageIndex(index)} src={image} alt={`Alt Image ${index}`} loading='lazy' />)
        }
      </div>
      <div className="product-images__main">
        <img src={allImages[currentImageIndex]} alt={product.name} loading='lazy' />
      </div>
    </div>
  );
}

export default Images;