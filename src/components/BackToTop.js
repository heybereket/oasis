import React from 'react';
import { FaChevronUp } from 'react-icons/fa';
import '../style/BackToTop.css';

const BackToTop = (options) => {

  window.onscroll = function (e) {
    if (window.scrollY > options.showUnder) {
      document.querySelector(".ScrollToTop").classList.add('open')
    } else {
      document.querySelector(".ScrollToTop").classList.remove('open')
    }
  };

  const ScrollToTop = () => {
    window.scrollTo({top: 100, behavior: 'smooth'})
  }

  return (
    <div className="ScrollToTop" onClick={ScrollToTop}>
        <FaChevronUp size={22}/>
    </div>
  );
}

BackToTop.defaultProps = {
  showUnder: 500
};

export default BackToTop;
