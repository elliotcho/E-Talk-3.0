import React from 'react';
import styled from 'styled-components';
import { useChatsQuery } from '../../generated/graphql';
import ChatCard from '../../components/chats/ChatCard';

const Container = styled.div`
    background: #e6e6e6;
`;

interface SidebarProps {
    chatId: number;
}

const Sidebar: React.FC<SidebarProps> = ({ chatId }) => {
    const { data } = useChatsQuery();

    return (
        <Container>
            {data?.chats.map(c => {
                const route = `/chat/${c.id}`;
                const { text, createdAt } = c.lastMessage;

                return (
                    <ChatCard
                        key = {c.id}
                        text = {text}
                        isActive = {c.id === chatId}
                        updatedAt = {createdAt}
                        picture = {c.picture}
                        route = {route}
                        title = {c.title}
                    />
                )   
            })}
        </Container>
    )
}

export default Sidebar;