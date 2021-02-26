import React from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import NextLink from 'next/link';

const Container = styled.div`
    height: 8vh;
    background: #6262b4;
`;

const Flex = styled.div`
    display: flex;
`;

const Header = styled.h2`
    cursor: pointer;
    margin-left: 15px;
    position: relative;
    bottom: 5px;
    color: white;
`;

const Box = styled.div`
    margin-left: auto;
    margin-top: 15px;
`;

const Link = styled.span`
    font-size: 1.3rem;
    margin-right: 10px;
    cursor: pointer;
    color: white;
    &:hover {
        text-decoration: underline;
    }
`;

const Navbar: React.FC<{}> = () => {
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
        <Container>
            <Flex>
                <NextLink href='/'>
                    <Header>E-Talk</Header>
                </NextLink>

                <Box>
                   {body}
                </Box>
            </Flex>
        </Container>
    )
}

export default Navbar;