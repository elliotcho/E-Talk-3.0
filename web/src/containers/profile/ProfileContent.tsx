import React from 'react';
import styled from 'styled-components';
import UserPosts from './UserPosts';

const Box  = styled.div`
    width: 90%;
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
        </Box>
    )
}

export default ProfileContent;