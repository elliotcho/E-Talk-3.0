import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: 5rem auto;
    margin-bottom: 50px;
    margin-right: 50px;
    margin-left: auto;
`;

const Box = styled.div`
    padding: 1rem 1.4rem;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    border-radius: 11px;
    background: red;
`;

const Image = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: auto;
`;

interface MessageBubbleProps {
    text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text }) => {
    return (
        <Container>
            <Image src='/loading.jpg' alt='pic'/>

            <Box>
                {text}
            </Box>
        </Container>
    )
}

export default MessageBubble;