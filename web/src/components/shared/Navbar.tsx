import React from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
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

const Link = styled.span`
    font-size: 1.3rem;
    margin-right: 15px;
    cursor: pointer;
    color: white;
    &:hover {
        text-decoration: underline;
    }
`;

const Index: React.FC<{}> = () => {
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    const { data, loading } = useMeQuery({
        skip: isServer()
    });

    let body = null;

    if(!loading) {
        if(!data?.me) {
            body = (
                <>
                    <NextLink href='/login'>
                        <Link>
                            Login
                        </Link>
                    </NextLink>

                    <NextLink href='/register'>
                        <Link>
                            Register
                        </Link>
                    </NextLink>
                </>
            )
        } else {
            body = (
                <>
                    <NextLink href={`/profile/${data.me.id}`}>
                        <Link>
                            Profile
                        </Link>
                    </NextLink>

                    <Link
                        onClick = {async (e) => {
                            e.preventDefault();

                            await logout();
                            await apolloClient.resetStore();
                        }}
                    >
                        Logout
                    </Link>
                </>
            )
        }
    }

    return (
        <Container expand='lg'>
            <Navbar.Brand href='/'>
                <Header>E-Talk</Header>
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