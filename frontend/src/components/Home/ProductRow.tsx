import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useAxios from '../../hooks/useAxios';
import { ProductResponseType } from '../../types/APIResponseTypes';
import Spinner from '../Utils/Spinner';
import Product from './Product';

interface ProductRowProps {
  url: string;
  title: string;
  linkTo: string;
}

const ProductRow: React.FC<ProductRowProps> = (props) => {
  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const productRowRef = useRef<HTMLDivElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);

  const { data } = useAxios(props.url, 'GET');

  useEffect(() => {
    //@ts-ignore
    if (data) setProducts(data.data.products);
  }, [data]);

  const slide = (type: 'left' | 'right'): void => {
    const scrollPixels = (productRowRef.current!.firstChild as HTMLDivElement).offsetWidth * 3;
    const row = productRowRef.current!;

    const manageActiveClass = (btn: HTMLButtonElement): void => {
      btn.classList.add('active');
      setTimeout(() => btn!.classList.remove('active'), 1000);
    };

    if (type === 'left') {
      row.scrollLeft -= scrollPixels;
      manageActiveClass(leftButtonRef.current as HTMLButtonElement);
    }
    if (type === 'right') {
      row.scrollLeft += scrollPixels;
      manageActiveClass(rightButtonRef.current as HTMLButtonElement);
    }
  };

  return (
    <section className="product-row">
      <div className="product-row__text">
        <h1>{props.title}</h1>
        <a href={props.linkTo}>Learn more</a>
      </div>
      {
        products.length > 0 ? (
          <>
            <button className="product-row__btn product-row__btn--left" ref={leftButtonRef} onClick={() => slide('left')}><BsChevronLeft /></button>
            <button className="product-row__btn product-row__btn--right" ref={rightButtonRef} onClick={() => slide('right')}><BsChevronRight /></button>
            <div className="product-row__items" ref={productRowRef}>
              {products.map(product => <Product key={product._id} product={product} />)}
            </div>
          </>
        ) : (
          <Spinner />
        )
      }
    </section>
  );
}

export default ProductRow;