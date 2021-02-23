import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../../../components/profile/ProfileCard';
import ProfileButtons from '../../../components/profile/ProfileButtons';

const Container = styled.div`
    position: relative;
    min-height: 460px;
    background: white;
    overflow: auto;
    color: black;
`;

const Menu = styled.ul`

`;

const Option = styled.li`
    list-style-type: none;
`;

const Sidebar: React.FC<{}> = () => { 
    return (
        <Container>
            <ProfileCard />

            <ProfileButtons />

            <Menu>
                <Option>
                    Friends
                </Option>

                <Option>
                    Friends
                </Option>
            </Menu>
        </Container>
    )
}

export default Sidebar;