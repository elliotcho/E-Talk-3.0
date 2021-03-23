import React from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBell,
    faUserFriends,
    faCommentAlt,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { useLogoutMutation } from '../../generated/graphql';
import { formatCount } from '../../utils/formatCount';
import NextLink from 'next/link';

const Item = styled.div`
    position: relative;
    @media screen and (max-width: 767px) {
        cursor: pointer;
        border-top: solid 1px black;
        padding: 12px;
        &:hover {
            background: black;
        }
    }
`;

const Icon = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 15px;
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
   @media screen and (max-width: 767px) {
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
   left: 50%;
   top: -45%;
   @media screen and (max-width: 767px) {
        min-width: 45px;
        text-align: center;
        padding: 3px 10px;
        left: 89%;
        top: 25%;
   }
`;

interface SignedInLinksProps {
    userId: number;
    friendRequests: number;
    notifications: number;
    firstName: string;
    lastName: string;
}

const SignedInLinks : React.FC<SignedInLinksProps> = ({ 
    userId, 
    friendRequests,
    notifications,
    firstName, 
    lastName 
}) => {
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    const initials = (firstName && lastName) ? 
                        firstName[0].toUpperCase() + lastName[0].toUpperCase() : 
                        '...';

    return (
        <Nav>
            <NextLink href='/mynetwork'>
                <Item>
                    <Icon>
                        <FontAwesomeIcon icon={faUserFriends}/>      
                    </Icon>

                    <Link>My Network</Link>

                    {!!friendRequests && (
                        <Box>{formatCount(friendRequests)}</Box>
                    )}
                </Item>
            </NextLink>

            <NextLink href='/'>
                <Item>
                    <Icon>
                        <FontAwesomeIcon icon={faCommentAlt}/>      
                    </Icon>

                    <Link>Messages</Link>

                    <Box>129</Box>
                </Item>
            </NextLink>

            <NextLink href='/notifications'>
                <Item>
                    <Icon>
                        <FontAwesomeIcon icon={faBell} />
                    </Icon>

                    <Link>Notifications</Link>

                    {!!notifications && (
                        <Box>
                            {formatCount(notifications)}
                        </Box>
                    )}
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