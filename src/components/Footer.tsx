import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import LanguageSelector from './LanguageSelector';
import { colorStack } from '../styledHelpers/colorStack';

const Wrapper = styled.footer`
    font-size: 0.9rem;
    padding: 1rem 0;
    font-family: "Inter", sans-serif;
    border-top: 1px solid ${colorStack.grey};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.div`
    margin-bottom: .5rem;
    text-align: center;
`;

export const Footer: FC = () => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Text>
                {`${t('footer.oasisBy')} `}
                <a aria-label="Bereket's Twitter" href="https://twitter.com/heybereket" target="_blank" rel="noreferrer">
                    @heybereket
                </a>
                <br />
                {`${t('footer.followUsOn')} `}
                <a aria-label="Hidden Tools' Twitter" href="https://twitter.com/hiddentools_" target="_blank" rel="noreferrer">
                    {t('footer.twitter')}
                </a>
                , {t('footer.openSourceOn')}
                <a aria-label="Hidden Tools' Github" href="https://github.com/heybereket/hiddentools.dev" target="_blank" rel="noreferrer">
                    &nbsp;{t('footer.github')}
                </a>
            </Text>
            <LanguageSelector />
        </Wrapper>
    );
};