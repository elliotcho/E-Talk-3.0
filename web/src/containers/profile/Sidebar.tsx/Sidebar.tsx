import React from 'react';
import styled from 'styled-components';
import { useUserQuery } from '../../../generated/graphql'; 
import ProfileCard from '../../../components/profile/ProfileCard';
import ProfileButtons from '../../../components/profile/ProfileButtons';
import ProfileMenu from '../../../components/profile/ProfileMenu';

const Container = styled.div`
    position: relative;
    height: 600px;
    background: white;
    overflow: auto;
    color: black;
`;

interface SidebarProps {
    userId: number;
}

const Sidebar: React.FC<SidebarProps> = ({ userId }) => { 
    const { data } = useUserQuery({
        variables: { userId },
        skip: userId === -1
    });

    let firstName = data?.user.firstName || 'Loading...';
    let lastName = data?.user.lastName || 'User...';
    let hasProfilePic = !!data?.user?.profilePic;
    let imgURL = data?.user?.profileURL;

    return (
        <Container>
            <ProfileCard 
                userId = {userId}
                firstName = {firstName}
                lastName = {lastName}
                hasProfilePic ={hasProfilePic}
                imgURL = {imgURL}
            />

            <ProfileButtons />

            <ProfileMenu />            
        </Container>
    )
}

export default Sidebar;