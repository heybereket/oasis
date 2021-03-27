import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import ScrollToTop from 'react-scroll-up';
import propTypes from 'prop-types';
import '../style/BackToTop.css';

const BackToTop = ({ duration }) => {
  return (
    <ScrollToTop duration={duration} style={{ zIndex: 9999 }} showUnder={500}>
      <span className="back-to-top__icon">
        <FontAwesomeIcon icon={faArrowUp} size="lg" color="#dee3ea" />
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
