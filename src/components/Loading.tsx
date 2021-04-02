import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

interface ILoadingProps {
    message: string;
}

const Loading: FC<ILoadingProps> = props => {
    return (
        <Wrapper>
            <strong>loading {props.message}...</strong>
        </Wrapper>

    );
};

export default Loading;
