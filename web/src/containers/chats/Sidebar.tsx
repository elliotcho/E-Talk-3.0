import React from 'react';
import styled from 'styled-components';
import { useChatsQuery } from '../../generated/graphql';

const Container = styled.div`
    background: silver;
`;

interface SidebarProps {
    chatId: number;
}

const Sidebar: React.FC<SidebarProps> = ({ chatId }) => {
    const { data } = useChatsQuery();

    return (
        <Container>
            {data?.chats.map(c => 
                <h1 key={c.id}>{c.title}</h1>
            )}
        </Container>
    )
}

export default Sidebar;