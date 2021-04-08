import React, { useEffect } from 'react';
import styled from 'styled-components';
import { 
    useMessagesQuery,
    useUsersTypingQuery, 
    useReadChatMutation 
} from '../../generated/graphql';
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
    const [readChat] = useReadChatMutation();
    const { data } = useMessagesQuery({ variables: { chatId } });
    const messages = data?.messages || [];

    const response = useUsersTypingQuery({
        variables: { chatId }
    });

    useEffect(() => {
        const onUpdate = async () => {
            await readChat({
                variables: { chatId },
                update: (cache) => {
                    cache.evict({ fieldName: 'chats' });
                }
            });
        }

        onUpdate();
    }, [chatId, data]);
    
    return (
        <Container>
            {response?.data?.usersTyping.map(u => 
                <TypingBubble key={u.id} {...u} />
            )}

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
                        messageId = {m.id}
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