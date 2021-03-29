import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 0.5rem 1.4rem;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    border-radius: 11px;
`;

interface MessageBubbleProps {
    text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text }) => {
    return (
        <Container>
            {text}
        </Container>
    )
}

export default MessageBubble;