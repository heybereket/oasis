import React, { FC, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { colorStack } from '../../styledHelpers/colorStack';

const Wrapper = styled.button<{active?: boolean, big?: boolean}>`
    font-family: Inter;
    font-size: .8rem;
    cursor: pointer;
    outline: none;
    margin: 5px;
    border-radius: 5px;
    transition: border .3s ease;
    color: ${colorStack.white};
    background: ${colorStack.buttonBg};
    border: 2px solid ${colorStack.lightGrey};
    padding: 5px 10px;
    ${props => props.big && css`
        text-transform: uppercase;
        margin: 0;
        width: 90%;
        max-width: 800px;
        padding: 1rem 0;
        font-weight: 700;
        font-size: 1rem;
    `}
    ${props => props.active && css`
        border: 2px solid ${colorStack.white};
    `}
    &:hover {
        border: 2px solid ${colorStack.white};
    }
`;

interface IButtonProps {
    category?: string;
    isActive?: boolean;
    count?: number;
    onClick?(category: string): void;
}

export const Button: FC<IButtonProps> = props => {

    const onClickHandler = useCallback(() => {
        props.onClick && props.onClick(props.category || '');
    }, [props]);

    return (
        <Wrapper
            active={props.isActive}
            title={props.category}
            onClick={onClickHandler}
        >
            {props.category}
            {props.children}
        </Wrapper>
    );
};

interface IBigButtonProps {
    onClick(): void;
}

export const BigButton: FC<IBigButtonProps> = props => {
    return (
        <Wrapper onClick={props.onClick} big>
            {props.children}
        </Wrapper>
    );
};