import React from 'react';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import SubscriptionWrapper from '../../containers/shared/SubscriptionWrapper';
import SignedOutLinks from '../../components/shared/SignedOutLinks';
import SignedInLinks from '../../components/shared/SignedInLinks';
import Searchbar from '../../components/shared/Searchbar';
import NextLink from 'next/link';

const Container = styled(Navbar)`
    font-family: 'Arial';
    background: #6262b4;
`;

const Header = styled.span`
    font-size: 1.4rem;
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
        } 
        
        else {
            const userId = data?.me?.id || -1;
            const friendRequests = data?.me?.unreadFriendRequests;
            const notifications = data?.me?.unreadNotifications;
            const firstName = data?.me?.firstName || '';
            const lastName = data?.me?.lastName || ''

            body = (
                <SubscriptionWrapper>
                     <SignedInLinks 
                        userId = {userId}
                        friendRequests = {friendRequests}
                        notifications = {notifications}
                        firstName = {firstName}
                        lastName = {lastName}    
                    />
                </SubscriptionWrapper>
            );
        }
    }

    return (
        <Container 
            collapseOnSelect
            expand = 'md'
        >
            <Navbar.Brand>
                <NextLink href='/'>
                    <Header>
                        E-Talk
                    </Header>
                </NextLink>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav'/>

            <Navbar.Collapse id='basic-navbar-nav'>
                {data?.me && (
                    <Searchbar />
                )}
                
                <Box>
                    {body}
                </Box>
            </Navbar.Collapse>
        </Container>
    )
}

export default Index;