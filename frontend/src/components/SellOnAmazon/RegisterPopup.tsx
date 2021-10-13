import React, { FormEvent, useRef, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { ImCross } from 'react-icons/im';

interface SellOnAmazonRegisterPopupProps {
  setShowPopup: Function;
};

const SellOnAmazonRegisterPopup: React.FC<SellOnAmazonRegisterPopupProps> = ({ setShowPopup }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const websiteInputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const websiteUrl = websiteInputRef.current!.value;
    const description = descriptionRef.current!.value;
    setIsProcessing(true);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/becomeSeller`, {
        website: websiteUrl,
        description: description
      }, { withCredentials: true });

      if (data.status === 'success') {
        swal({
          title: 'Thanks for participation!',
          text: 'Our moderators will now review your request, and you will receive an email regarding confirmation and the next steps within 1-5 working days.',
          icon: 'success',
        }).then(() => window.location.reload());
      }
    } catch (err) {
      swal({
        title: 'Error!',
        //@ts-ignore
        text: err?.response?.data?.message,
        icon: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="seller-register-popup">
      <h1 className="seller-register-popup__title">Register to be a seller</h1>
      <i className="icon icon--close seller-register-popup__icon" onClick={() => setShowPopup(false)}><ImCross /></i>
      <form className="form seller-register-popup__form" onSubmit={handleFormSubmit}>
        <div className="form__group">
          <label htmlFor="website" className="form__label">Official business website</label>
          <input ref={websiteInputRef} required type="url" id="website" className="form__input" />
        </div>
        <div className="form__group">
          <label htmlFor="about" className="form__label">Describe your business</label>
          <textarea ref={descriptionRef} required id="about" className="form__input" minLength={200}></textarea>
        </div>
        <button className="btn btn--dark-orange" type="submit" disabled={isProcessing}>
          {!isProcessing ? 'Register' : 'Processing...'}
        </button>
      </form>
    </div>
  );
};

export default SellOnAmazonRegisterPopup;