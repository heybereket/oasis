import { FC } from 'react';
import styled from 'styled-components';

export const Wrapper = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 2rem 0;
    h1 {
        font-weight: 600;
        font-family: "Inter";
        font-size: 2.5rem;
        margin: 0 0 1rem 0;
    }
`;

interface IPageHeaderProps {
    title?: string;
    subTitle?: string;
}

export const PageHeader: FC<IPageHeaderProps> = props => {
    return (
        <Wrapper>
            <h1>{props.title || window.location.pathname}</h1>
            <p>{props.subTitle || ''}</p>
        </Wrapper>
    );
};