import React from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { useLogoutMutation } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import NextLink from 'next/link';

const Dropdown = styled.div`
    z-index: 1;
    box-shadow: 0 0 5px black;
    min-width: 200px;
    position: absolute;
    background: #f9f9f9;
    right: 0px;
    top: 6vh;
`;

const Option = styled.div`
    cursor: pointer;
    font-size: 1.3rem;
    padding: 10px 20px;
    &:hover {
        background: darkblue;
        color: white;
    }
`;

const Icon = styled.span`
    margin-right: 10px;
    font-weight: bold;
`;

interface NavDropdownProps {
    open: boolean;
    onClose(): void;
    initials: string;
    userId: number;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ 
    open,
    onClose, 
    initials, 
    userId,
 }) => {
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    if(!isServer()) {
        window.addEventListener('click', function(e: any){
            if(!document.getElementById('basic-nav-dropdown')?.contains(e.target)){
                onClose();
            }
        });
    }

    const style = !open? { display: 'none' } : {};

    return (
        <Dropdown style={style}>
            <NextLink href={`/profile/${userId}`}>
                <Option>
                    <Icon>
                        {initials}
                    </Icon>

                    Profile
                </Option>
            </NextLink>

            <NextLink href='/settings'>
                <Option>
                    <Icon>
                        <FontAwesomeIcon icon={faUserCog} />
                    </Icon>

                    Settings
                </Option>
            </NextLink>

            <Option
                onClick = {async (e) => {
                    e.preventDefault();

                    await logout();
                    await apolloClient.resetStore();
                }}
            >
                <Icon>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                </Icon>

                Logout
            </Option>
        </Dropdown>
    )
}

export default NavDropdown;