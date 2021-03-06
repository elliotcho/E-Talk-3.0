import React from 'react';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import NextLink from 'next/link';

const Container = styled(Navbar)`
    height: 8vh;
    font-family: 'Arial';
    background: #6262b4;
`;

const Header = styled.h3`
    align: top;
    display: inline-block;
    margin-left: 15px;
    cursor: pointer;
    color: white;
`;

const Box = styled.div`
    margin-left: auto;
`;

const Index: React.FC<{}> = () => {
    const { data, loading } = useMeQuery({
        skip: isServer()
    });

    let body = null;

    if(!loading) {
        if(!data?.me) {
            body =  (
                <SignedOutLinks />
            );
        } else {
            let userId = data?.me?.id || -1;

            body = (
                <SignedInLinks userId={userId}/>
            );
        }
    }

    return (
        <Container expand='lg'>
            <Navbar.Brand>
                <NextLink href='/'>
                    <Header>
                        E-Talk
                    </Header>
                </NextLink>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav'/>

            <Navbar.Collapse id='basic-navbar-nav'>
                <Box>
                    {body}
                </Box>
            </Navbar.Collapse>
        </Container>
    )
}

export default Index;