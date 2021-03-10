import React from 'react';
import styled from 'styled-components';
import { useUserQuery } from '../../generated/graphql'; 
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileButtons from '../../components/profile/ProfileButtons';
import ProfileMenu from '../../components/profile/ProfileMenu';

const Container = styled.div`
    position: relative;
    height: 600px;
    background: white;
    overflow: auto;
    color: black;
`;

interface SidebarProps {
    userId: number;
    type: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userId, type }) => { 
    const { data } = useUserQuery({
        variables: { userId },
        skip: userId === -1
    });

    let isOwner = !!data?.user.isMe;
    let firstName = data?.user.firstName || 'Loading...';
    let lastName = data?.user.lastName || 'User...';
    let imgURL = data?.user?.profileURL || '/loading.jpg';
    let hasProfilePic = !!data?.user?.profilePic;
    let friendStatus = data?.user?.friendStatus;

    return (
        <Container>
            <ProfileCard 
                isOwner = {isOwner}
                firstName = {firstName}
                lastName = {lastName}
                hasProfilePic ={hasProfilePic}
                imgURL = {imgURL}
            />

            {!isOwner && (
                <ProfileButtons 
                    friendStatus = {friendStatus}
                    friendId = {userId}
                />
            )}

            <ProfileMenu 
                userId = {userId}
                type = {type}
            />            
        </Container>
    )
}

export default Sidebar;