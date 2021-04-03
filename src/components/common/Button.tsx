import React, { FC, useCallback } from 'react';

interface IButtonProps {
    category: string;
    isActive: boolean;
    count?: number;
    onClick(category: string): void;
}

export const Button: FC<IButtonProps> = props => {

    const onClickHandler = useCallback(() => {
        props.onClick(props.category);
    }, [props.onClick, props.category]);

    return (
        <button
            className={`filter-button ${props.isActive ? 'filter-active' : ''}`}
            title={props.category}
            onClick={onClickHandler}
        >
            {props.category}
        </button>
    )
}