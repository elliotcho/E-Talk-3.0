import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBell,
    faUserFriends,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { useLogoutMutation, useNewLikeSubscription } from '../../generated/graphql';
import NextLink from 'next/link';

const Item = styled.div`
    @media screen and (max-width: 768px) {
        cursor: pointer;
        margin-top: 20px;
        padding: 12px;
        &:hover {
            background: black;
        }
    }
`;

const Icon = styled.span`
    font-size: 1.3rem;
    font-weight: bold;
    margin-right: 30px;
    cursor: pointer;
    color: white;
    @media screen and (min-width: 768px) {
        &:hover {
            color: black;
        }
    }
`;

const Link = styled.span`
   display: none;
   @media screen and (max-width: 768px) {
       color: white;
       display: inline-block;
       position: relative;
       bottom: 2px;
       ${Item}:hover & {
           text-decoration: underline;
       }
   }
`;

interface SignedInLinksProps {
    userId: number;
    firstName: string;
    lastName: string;
}

const SignedInLinks : React.FC<SignedInLinksProps> = ({ userId, firstName, lastName }) => {
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    const { data, error } = useNewLikeSubscription();

    const initials = (firstName && lastName) ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}` : '...';

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
                    <Icon>
                        <FontAwesomeIcon icon={faUserFriends}/>      
                    </Icon>

                    <Link>My Network</Link>
                </Item>
            </NextLink>

            <NextLink href='/notifications'>
                <Item>
                    <Icon>
                        <FontAwesomeIcon icon={faBell} />
                    </Icon>

                    <Link>
                        Notifications
                    </Link>
                </Item>
            </NextLink>

            <NextLink href={`/profile/${userId}`}>
                <Item>
                    <Icon>
                        {initials}
                    </Icon>

                    <Link>Profile</Link>
                </Item>
            </NextLink>

            <Item
                 onClick = {async (e) => {
                    e.preventDefault();

                    await logout();
                    await apolloClient.resetStore();
                }}
            >
                <Icon>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                </Icon>

                <Link>Logout</Link>
            </Item>
        </Nav>
    )
}

export default SignedInLinks;