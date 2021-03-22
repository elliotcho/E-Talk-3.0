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
    position: relative;
    @media screen and (max-width: 768px) {
        cursor: pointer;
        border-bottom: 1px solid black;
        padding: 12px;
        &:hover {
            background: black;
        }
        &:last-child {
            border-bottom: 0;
        }
    }
`;

const Icon = styled.span`
    font-size: 1.2rem;
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

const Box = styled.div`
   color: white;
   background: orangered;
   position: absolute;
   font-size: 0.8rem;
   font-weight: bold;
   padding: 2px 5px;
   left: 33%;
   top: -45%;
   @media screen and (max-width: 768px) {
        padding: 3px 10px;
        left: 89% !important;
        top: 25%;
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

                    <Box>129</Box>
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

                    <Box style={{ left: '25%'}}>1.2k</Box>
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