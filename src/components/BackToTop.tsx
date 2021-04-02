import { FC } from 'react';
import { FaChevronUp } from 'react-icons/fa';

import '../style/BackToTop.css';

const BackToTop: FC = () => {

    window.onscroll = function (e: any) {
        if (window.scrollY > 500) {
            document?.querySelector('.ScrollToTop')?.classList.add('open');
        } else {
            document?.querySelector('.ScrollToTop')?.classList.remove('open');
        }
    };

    const ScrollToTop = () => {
        window.scrollTo({ top: 100, behavior: 'smooth' })
    }

    return (
        <div className="ScrollToTop" onClick={ScrollToTop}>
            <FaChevronUp size={22} />
        </div>
    );
};

export default BackToTop;
