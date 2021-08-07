import axios from 'axios';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import React, { useState, useEffect, useRef } from 'react';

type APIResponse = {
  image: string;
  link: string;
  _id: string;
};

const HeaderBanner: React.FC = () => {
  const [banners, setBanners] = useState<APIResponse[]>([]);
  const slidesRef = useRef<HTMLDivElement | any>();

  const fetchBanners = async (): Promise<APIResponse[]> => {
    const { data } = await axios.get('/api/v1/banners');
    const banners = data.data.banners;
    return banners;
  };

  useEffect(() => {
    fetchBanners().then((banners) => setBanners(banners));
  }, []);

  const slide = (type: 'left' | 'right'): void => {
    const width = slidesRef.current.clientWidth;
    if (type === 'left') {
      slidesRef.current.scrollLeft -= width;
    }
    if (type === 'right') {
      slidesRef.current.scrollLeft += width;
    }
  };

  return (
    <header className="header">
      <div className="carousel">
        <button onClick={() => slide('left')} className="carousel__button carousel__button--left"><BsChevronLeft /></button>
        <button onClick={() => slide('right')} className="carousel__button carousel__button--right"><BsChevronRight /></button>
        <div className="slides" ref={slidesRef}>
          {
            banners.length > 0 && banners.map((banner: APIResponse, i: number) => {
              return (
                <div key={banner._id} className={`slide slide--${i + 1}`} style={{
                  backgroundImage: `url('/img/banners/${banner.image}')`,
                }}>
                </div>
              )
            })
          }
        </div>
      </div>
    </header>
  );
}

export default HeaderBanner;