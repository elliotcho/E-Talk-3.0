import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { useLogoutMutation, useNewLikeSubscription } from '../../generated/graphql';
import NextLink from 'next/link';

const Item = styled.div`
    @media screen and (max-width: 768px) {
        cursor: pointer;
        margin-top: 20px;
        padding: 12px;
        &:hover {
            background: azure;
        }
    }
`;

const Link = styled.span`
    font-size: 1.1rem;
    margin-right: 15px;
    cursor: pointer;
    color: white;
    &:hover {
        text-decoration: underline;
    }
    
    @media screen and (max-width: 768px) {
        ${Item}:hover & {
            text-decoration: underline;
            color: black;
        }
    }
`;

interface SignedInLinksProps {
    userId: number;
}

const SignedInLinks : React.FC<SignedInLinksProps> = ({ userId }) => {
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    const { data, error } = useNewLikeSubscription();

    useEffect(() => {
        if(data && !error) {
            alert("HI");
        }

        console.log(data, error)
    }, [data, error])

    return (
        <Nav>
            <NextLink href='/mynetwork'>
                <Item>
                    <Link>My Network</Link>
                </Item>
            </NextLink>

            <NextLink href={`/profile/${userId}`}>
                <Item>
                    <Link>Profile</Link>
                </Item>
            </NextLink>

            <Item>
                <Link
                        onClick = {async (e) => {
                            e.preventDefault();

                            await logout();
                            await apolloClient.resetStore();
                        }}
                    >
                        Logout
                </Link>
            </Item>
        </Nav>
    )
}

export default SignedInLinks;