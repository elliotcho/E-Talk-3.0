import React from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { useLogoutMutation } from '../../generated/graphql';
import NextLink from 'next/link';

const Link = styled.span`
    font-size: 1.3rem;
    margin-right: 15px;
    cursor: pointer;
    color: white;
    &:hover {
        text-decoration: underline;
    }
`;

interface SignedInLinksProps {
    userId: number;
}

const SignedInLinks : React.FC<SignedInLinksProps> = ({ userId }) => {
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    return (
        <Nav>
            <Nav.Item>
                <NextLink href={`/profile/${userId}`}>
                    <Link>
                        Profile
                    </Link>
                </NextLink>
            </Nav.Item>

            <Nav.Item>
                <Link
                        onClick = {async (e) => {
                            e.preventDefault();

                            await logout();
                            await apolloClient.resetStore();
                        }}
                    >
                        Logout
                </Link>
            </Nav.Item>
        </Nav>
    )
}

export default SignedInLinks;