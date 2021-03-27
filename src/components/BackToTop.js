import React from 'react';
import { FaChevronUp } from 'react-icons/fa';
import ScrollToTop from 'react-scroll-up';
import propTypes from 'prop-types';
import '../style/BackToTop.css';

const BackToTop = ({ duration }) => {
  return (
    <ScrollToTop duration={duration} style={{ zIndex: 9999 }} showUnder={500}>
      <span className="back-to-top__icon">
        <FaChevronUp size={22}/>
      </span>
    </ScrollToTop>
  );
}

BackToTop.propTypes = {
  duration: propTypes.number
};

BackToTop.defaultProps = {
  duration: 500
};

export default BackToTop;
