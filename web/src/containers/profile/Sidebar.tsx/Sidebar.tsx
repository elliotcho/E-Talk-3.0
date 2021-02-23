import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../../../components/profile/ProfileCard';
import ProfileButtons from '../../../components/profile/ProfileButtons';
import ProfileMenu from '../../../components/profile/ProfileMenu';

const Container = styled.div`
    position: relative;
    min-height: 460px;
    background: white;
    overflow: auto;
    color: black;
`;

const Sidebar: React.FC<{}> = () => { 
    return (
        <Container>
            <ProfileCard />

            <ProfileButtons />

            <ProfileMenu />            
        </Container>
    )
}

export default Sidebar;