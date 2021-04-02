import { FC } from 'react';
import styled from 'styled-components';

import RepositoryCard from './RepositoryCard';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    grid-gap: 30px;
    gap: 30px;
    justify-content: center;
`;

interface IRepositoryListProps {
    repositories: any;
}

const RepositoryList: FC<IRepositoryListProps> = ({ repositories }) => {
    return (
        <Wrapper>
            {repositories.map((repo: any) => <RepositoryCard project={repo} />)}
        </Wrapper>
    );
};

export default RepositoryList;