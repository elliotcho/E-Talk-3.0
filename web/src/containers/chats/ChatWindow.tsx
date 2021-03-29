import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useChatQuery } from '../../generated/graphql';
import ChatContainer from './MessagesContainer';
import ChatHeader from '../../components/chats/ChatHeader';
import ChatComposer from '../../components/chats/ChatComposer';
import SendMessage from '../../components/chats/SendMessage';

const Main = styled.div`
    display: grid;
    grid-template-rows: 1fr 8.5fr auto;
    grid-row-gap: 0;
`;

const EmptyContainer = styled.div`
    background: #737373;
`;

interface ChatWindowProps {
    chatId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
    const [recipients, setRecipients] = useState([]);
    const [isChat, setIsChat] = useState(false);

    const { data } = useChatQuery({
        variables: { chatId }
    });

    const title = data?.chat.title || 'Loading...';

    useEffect(() => {

        if(!!data) {
            setIsChat(true);
        }
        
    }, [data]);

    return (
        <Main>
            {isChat? (
                <ChatHeader title={title}/>
            ) : (
                <ChatComposer 
                    recipients = {recipients}
                    setRecipients = {(r: any[]) => {
                        setRecipients(r);
                    }}
                />
            )}

            {isChat? (
                <ChatContainer chatId={chatId}/>
            ): (
                <EmptyContainer />
            )}

            <SendMessage 
                isChat = {isChat}
                recipients = {recipients}
                chatId = {chatId}
            />
        </Main>
    )
}

export default ChatWindow;