import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import LanguageSelector from './LanguageSelector';

const Wrapper = styled.div`
  position: relative;
    padding: 10px 0;
    border-top: 2px solid hsla(0,0%,100%,.1);
    background-color: transparent;
    font-family: "Inter",sans-serif;
    font-weight: 450;
    font-size: 15px;
    text-align: center;
`;

export const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
};

