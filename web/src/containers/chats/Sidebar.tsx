import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useChatsQuery } from '../../generated/graphql';
import ChatCard from '../../components/chats/ChatCard';
import NextLink from 'next/link';

const Container = styled.div`
    background: #e6e6e6;
`;

const Flex = styled.div`
    display: flex;
    background: #f2f2f2;
    padding: 12px;
    margin: 0;
`;

const Header = styled.h3`
    color: black;
`;

const Secondary = styled.h3`
    color: #737373;
    text-align: center;
    margin-top: 50px;
`;

const Box = styled.div`
    margin: 0 10px 0 auto;
    font-size: 1.5rem;
    cursor: pointer;
    color: black;

    &:hover {
        color: gray;
    }
`;

interface SidebarProps {
    chatId: number;
}

const Sidebar: React.FC<SidebarProps> = ({ chatId }) => {
    const { data } = useChatsQuery();

    return (
        <Container>
            <Flex>
                <Header>Chats</Header>

                <Box>
                    <NextLink href='/chat'>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </NextLink>
                </Box>
            </Flex>

            {data?.chats.map(c => {
                const route = `/chat/${c.id}`;
                const isActive = c.id === chatId;
                
                const { text } = c.lastMessage;

                return (
                    <ChatCard
                        key = {c.id}
                        text = {text}
                        isActive = {isActive}
                        route = {route}
                        {...c}
                    />
                )   
            })}

            {!data?.chats.length && (
                <Secondary>
                    No chats available :(
                </Secondary>
            )}
        </Container>
    )
}

export default Sidebar;