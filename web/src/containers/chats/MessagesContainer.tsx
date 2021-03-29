import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMessagesQuery } from '../../generated/graphql';

const Container = styled.div`
    background: black;
    color: white;
`;

interface MessagesContainerProps {
    chatId: number;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ chatId }) => {
    const { data, refetch } = useMessagesQuery({
        variables: { chatId }
    });
    
    return (
        <Container>
            {data?.messages.map(m => 
                <h1>{m.text}</h1>
            )}
        </Container>
    )
}

export default MessagesContainer;