import React from 'react';
import styled from 'styled-components';

const Menu = styled.ul`
    margin: 30px auto;
    &:last-child {
        border-bottom: none;
    }
`;

const Option = styled.li`
    width: 80%;
    padding: 10px;
    margin-bottom: 20px;
    list-style-type: none;
    border-bottom: 1px solid black;
    cursor: pointer;
    &:hover { text-decoration: underline; } 
    &:last-child { border-bottom: none; }
`;

const ProfileMenu : React.FC<{}> = () => {
    return (
        <>
            <Menu>
                <Option>Posts</Option>

                <Option>Friends</Option>

                <Option>Bio</Option>
            </Menu>
        </>
    )
}

export default ProfileMenu;