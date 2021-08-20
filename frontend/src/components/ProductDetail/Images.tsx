import React, { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
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
        <ReactImageMagnify enlargedImageContainerClassName="enlarged-image" fadeDurationInMs={200} {...{
          smallImage: {
            alt: product.name,
            isFluidWidth: true,
            src: allImages[currentImageIndex],
          },
          largeImage: {
            src: allImages[currentImageIndex],
            width: 1800,
            height: 1800
          }
        }} />
      </div>
    </div>
  );
}

export default Images;