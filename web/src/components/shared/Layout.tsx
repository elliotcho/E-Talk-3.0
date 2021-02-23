import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
    height: 92vh;
    position: relative;
    background: #5a535a;
    overflow: auto;
    color: white;
`;

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <>
            <Navbar />

            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout;