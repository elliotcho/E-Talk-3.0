import React from 'react';
import styled from 'styled-components';

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

const ProfileButtons: React.FC<{}> = () => {
    return (
        <>
            <Box>
                <ButtonPrimary>
                    Add Friend
                </ButtonPrimary>

                <ButtonInverse>
                    Message
                </ButtonInverse>
            </Box>
        </>
    )
}

export default ProfileButtons;