import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import '../style/footer.css';
import LanguageSelector from './LanguageSelector';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="footer">
        {`${t('footer.oasisBy')} `}
        <a
          aria-label="Bereket's Twitter"
          href="https://twitter.com/heybereket"
          target="_blank"
          rel="noreferrer"
        >
          @heybereket
        </a>{" "}
        🤞🏻
        <br />
        {`${t('footer.followUsOn')} `}
        <a
          aria-label="Hidden Tools' Twitter"
          href="https://twitter.com/hiddentools_"
          target="_blank"
          rel="noreferrer"
        >
          {t('footer.twitter')}
        </a>
        , {t('footer.openSourceOn')}
        <a
          aria-label="Hidden Tools' Github"
          href="https://github.com/heybereket/hiddentools.dev"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          {t('footer.github')}
        </a>
        .
        <div className="footer__language-selector">
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};

export default Footer;
