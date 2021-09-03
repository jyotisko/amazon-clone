import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useAxios from '../../hooks/useAxios';
import { BannerResponseType } from '../../types/APIResponseTypes';
import Spinner from '../Utils/Spinner';

const HeaderBanner: React.FC = () => {
  const [banners, setBanners] = useState<BannerResponseType[]>([]);
  const slidesRef = useRef<HTMLDivElement>(null);

  const { data } = useAxios(`${process.env.REACT_APP_API_URL}/banners`, 'GET');

  useEffect(() => {
    //@ts-ignore
    if (data) return setBanners(data.data.banners);
  }, [data]);

  const slide = (type: 'left' | 'right'): void => {
    const slidesElement = slidesRef.current!;
    const width = slidesElement.clientWidth;
    if (type === 'left') slidesElement.scrollLeft -= width;
    if (type === 'right') slidesElement.scrollLeft += width;
  };

  return (
    <header className="header">
      <div className="carousel">
        {
          banners.length > 0 ? (
            <>
              <button onClick={() => slide('left')} className="carousel__button carousel__button--left"><BsChevronLeft /></button>
              <button onClick={() => slide('right')} className="carousel__button carousel__button--right"><BsChevronRight /></button>
              <div className="slides" ref={slidesRef}>
                {
                  banners.map((banner: BannerResponseType, i: number) => {
                    return (
                      <div key={banner._id} className={`slide slide--${i + 1}`} style={{
                        backgroundImage: `url(${banner.image})`,
                      }}>
                        <Link to={banner.link}></Link>
                      </div>
                    )
                  })
                }
              </div>
            </>
          ) : <Spinner styles={{ top: `20%` }} />
        }
      </div>
    </header>
  );
}

export default HeaderBanner;