import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';

const Main = styled.div`
    height: 92vh;
    position: relative;
    background: #5a535a;
    font-family: 'Arial';
    overflow: auto;
    color: white;
`;

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <>
            <Navbar />

            <Main>
                <ToastContainer />
                {children}
            </Main>
        </>
    )
}

export default Layout;