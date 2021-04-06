import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useChatQuery } from '../../generated/graphql';
import MessagesContainer from './MessagesContainer';
import ChatHeader from '../../components/chats/ChatHeader';
import ChatComposer from '../../components/chats/ChatComposer';
import SendMessage from '../../components/chats/SendMessage';

const Main = styled.div`
    display: grid;
    grid-template-rows: 1fr 8.5fr auto;
    overflow: hidden;
`;

const EmptyContainer = styled.div`
    background: #ccc;
`;

interface ChatWindowProps {
    chatId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
    const [recipients, setRecipients] = useState([]);
    const [isChat, setIsChat] = useState(false);

    const { data } = useChatQuery({ variables: { chatId } });
    const picture = data?.chat?.picture || '/loading.jpg';
    const title = data?.chat?.title || 'Loading...';

    useEffect(() => {

        if(!!data?.chat) {
            setIsChat(true);
        }
        
    }, [data]);

    return (
        <Main>
            {isChat && <ChatHeader picture={picture} title={title}/>}

            {!isChat && (
                <ChatComposer 
                    recipients = {recipients}
                    setRecipients = {(r: any[]) => {
                        setRecipients(r);
                    }}
                />
            )}

            {isChat && <MessagesContainer chatId={chatId} />}
            {!isChat && <EmptyContainer />}

            {(!!recipients.length || isChat) && (
                <SendMessage 
                    isChat = {isChat}
                    recipients = {recipients}
                    chatId = {chatId}
                />
            )}
        </Main>
    )
}

export default ChatWindow;