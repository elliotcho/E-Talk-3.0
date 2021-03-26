import React from 'react';
import styled from 'styled-components';
import { useMeQuery, useUserQuery } from '../../generated/graphql'; 
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileButtons from '../../components/profile/ProfileButtons';
import ProfileMenu from '../../components/profile/ProfileMenu';

const Container = styled.div`
    height: 510px;
    margin-bottom: 50px;
    position: relative;
    background: white;
    overflow: auto;
    color: black;
`;

interface ProfileSidebarProps {
    userId: number;
    type: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ userId, type }) => { 
    const myId = useMeQuery()?.data?.me?.id;

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

            {!isOwner && myId && (
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

export default ProfileSidebar;