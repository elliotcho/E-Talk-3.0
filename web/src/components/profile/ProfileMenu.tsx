import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

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

interface ProfileMenuProps {
    userId: number;
    type: string;
}

const ProfileMenu : React.FC<ProfileMenuProps> = ({ userId, type }) => {
    let options = ['Posts', 'Friends', 'Bio'];

    return (
        <>
            <Menu>
                {options.map(option => {
                    let choice = option.toLowerCase();
                    let route = `/profile/${userId}/${choice}`;
                    let style = {};

                    if(type === choice) {
                        style = { textDecoration: 'underline' };
                    }

                    return (
                        <NextLink key={option} href={route}>
                            <Option style={style}>
                                {option}
                            </Option>
                        </NextLink>
                    )
                })}
            </Menu>
        </>
    )
}

export default ProfileMenu;