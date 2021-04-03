import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const Content = styled.div`
    margin-top: 110px;
`;

export const Layout: FC = props => {
    return (
        <BrowserRouter>
            <Navbar />
            <Content>
                {props.children}
            </Content>
            <Footer />
        </BrowserRouter>
    );
};