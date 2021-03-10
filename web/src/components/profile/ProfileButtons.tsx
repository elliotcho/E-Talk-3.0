import React from 'react';
import styled from 'styled-components';
import FriendButton from '../shared/FriendButton';

const Box = styled.div`
    text-align: center;
`;

const ButtonStyles = `
    cursor: pointer;
    font-size: 15px;
    padding: 15px;
    margin-right: 12px;
    border-radius: 11px;
    border-width: 0px;
    outline: none;
    color: white;
`

const ButtonPrimary = styled.button`
    ${ButtonStyles}
    background: #0275d8;
    &:hover {
        background: #0054a7;
    }
`;

const ButtonInverse = styled.button`
    ${ButtonStyles}
    background: #292b2c;
    &:hover {
        background: #4d4d4d;
    }
`;

interface ProfileButtonsProps {
    friendStatus: number;
    friendId: number;
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({ friendStatus, friendId }) => {
    return (
        <>
            <Box>
                <FriendButton
                    friendStatus ={friendStatus}
                    friendId = {friendId}
                >
                    <ButtonPrimary>
                        {friendStatus === 0 && 'Add Friend'}
                        {friendStatus === 1 && 'Pending'}
                        {friendStatus === 2 && 'Friends'}
                    </ButtonPrimary>
                </FriendButton>

                <ButtonInverse>
                    Message
                </ButtonInverse>
            </Box>
        </>
    )
}

export default ProfileButtons;