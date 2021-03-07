import React from 'react';
import styled from 'styled-components';

const Box  = styled.div`
    width: 90%;
    min-height: 460px;
    min-width: 600px;
    background: white;
    overflow: auto;
    color: black;
`;

interface ProfileContentProps {
    type: string;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ type }) => {
    return (
        <Box>

        </Box>
    )
}

export default ProfileContent;