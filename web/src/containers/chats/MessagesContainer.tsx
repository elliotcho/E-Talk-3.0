import React from 'react';
import styled from 'styled-components';
import { useMessagesQuery } from '../../generated/graphql';
import MessageBubble from '../../components/chats/MessageBubble';

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background: #f2f2f2;
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
                    {...m.user}
                    {...m}
                />
            )}
        </Container>
    )
}

export default MessagesContainer;