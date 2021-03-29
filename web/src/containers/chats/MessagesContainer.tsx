import React from 'react';
import styled from 'styled-components';
import { useMessagesQuery } from '../../generated/graphql';
import MessageBubble from '../../components/chats/MessageBubble';

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background: #8c8c8c;
    overflow-x: hidden;
    overflow-y: auto;
`;

interface MessagesContainerProps {
    chatId: number;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ chatId }) => {
    const { data } = useMessagesQuery({
        variables: { chatId }
    });
    
    return (
        <Container>
            {data?.messages.map(m => 
                <MessageBubble
                    key = {m.id}
                    text = {m.text}
                />
            )}
        </Container>
    )
}

export default MessagesContainer;