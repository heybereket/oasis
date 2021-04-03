import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '../components/common/Buttons';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 210px);
    h1 {
        font-size: 5rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    span {
        font-weight: 400;
        margin: 0 0 1rem 0;
    }
`;

const InvalidPage = () => {
    return (
        <Wrapper>
            <h1>404 😢</h1>
            <span>
                <strong>bummer!</strong> the page you are looking for could not be found.
            </span>
            <div>
                <Link to="/">
                    <Button>home / repos 🎉</Button>
                </Link>
                <Link to="/new">
                    <Button>submit a repo 🔥</Button>
                </Link>
            </div>
        </Wrapper>
    );
};

export default InvalidPage;
