import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: 5rem auto;
    margin: 0 auto 30px 50px;
`;

const Box = styled.div`
    max-width; 400px;
    padding: 1rem 1.4rem;
    border-radius: 11px;
    background: #d9d9d9;
    color: black;
`;

const Image = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: auto;
`;

interface MessageBubbleProps {
    isMe: boolean;
    profileURL: string;
    hasImage: boolean;
    text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
    isMe,
    profileURL,
    hasImage,
    text
 }) => {
    let color = '';
    let visibility: 'hidden';
    let background = '';
    let margin = '';

    if(isMe) {
        visibility = 'hidden';
        margin = '0 50px 30px auto';
        background = '#00ccff';
        color = 'white';
    }

    if(!hasImage) {
        visibility = 'hidden';
    }

    return (
        <Container style={{ margin }}>
             <Image 
                src={profileURL} 
                style = {{ visibility }}
                alt='profile pic'
            />

            <Box style = {{ background, color }}>
                {text}
            </Box>
        </Container>
    );

}

export default MessageBubble;