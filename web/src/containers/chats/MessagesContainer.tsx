import React from 'react';
import styled from 'styled-components';
import { useMessagesQuery } from '../../generated/graphql';
import MessageBubble from '../../components/chats/MessageBubble';
import TypingBubble from '../../components/chats/TypingBubble';

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background: #f2f2f2;
    overflow-x: hidden;
    overflow-y: auto;
`;

const Space  = styled.div`
    background: #f2f2f2;
    min-height: 30px;
`;

interface MessagesContainerProps {
    chatId: number;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ chatId }) => {
    const { data } = useMessagesQuery({ variables: { chatId } });
    const messages = data?.messages || [];
    
    return (
        <Container>
            <TypingBubble />

            {messages.map((m, i) => { 
                let hasImage = true;
                
                const prevUser = messages[i - 1]?.userId;
                const currUser = messages[i]?.userId;

                if((i !== 0) && (currUser === prevUser)) {
                    hasImage = false;
                } 

                return (
                    <MessageBubble
                        key = {m.id}
                        hasImage = {hasImage}
                        {...m.user}
                        {...m}
                    />
                )
            })}

            <Space />
        </Container>
    )
}

export default MessagesContainer;