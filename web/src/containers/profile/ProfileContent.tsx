import React from 'react';
import styled from 'styled-components';
import UserPosts from './UserPosts';
import UserFriends from './UserFriends';
import UserBio from './UserBio';

const Box  = styled.div`
    width: 90%;
    position: relative;
    min-height: 460px;
    min-width: 600px;
    background: white;
    overflow: auto;
    color: black;
`;

interface ProfileContentProps {
    userId: number;
    type: string;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ userId, type }) => {
    return (
        <Box>
            {type === 'posts' && <UserPosts userId = {userId}/>}
            {type === 'friends' && <UserFriends userId = {userId} />}
            {type === 'bio' && <UserBio userId = {userId} />}
        </Box>
    )
}

export default ProfileContent;