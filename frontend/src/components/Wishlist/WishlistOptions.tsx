import React, { useEffect } from 'react';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { HiViewList } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

interface WishlistOptionsProps {
  changeView: (string: 'grid' | 'list') => void;
  activeView: 'grid' | 'list';
};

const WishlistOptions: React.FC<WishlistOptionsProps> = ({ changeView, activeView }) => {
  return (
    <div className="wishlist__options">
      <div className="wishlist__icons">
        <i className={`icon icon--grid wishlist__icon ${activeView === 'grid' && 'wishlist__icon--active'}`} onClick={() => changeView('grid')}><BsFillGrid3X3GapFill /></i>
        <i className={`icon icon--grid wishlist__icon ${activeView === 'list' && 'wishlist__icon--active'}`} onClick={() => changeView('list')}><HiViewList /></i>
      </div>
      <form className="wishlist__form">
        <div className="wishlist__form__content">
          <i className="icon icon--search wishlist__form__icon"><BiSearch /></i>
          <input type="text" className="wishlist__form__input" placeholder="Search the list" />
        </div>
      </form>
    </div>
  );
};

export default WishlistOptions;