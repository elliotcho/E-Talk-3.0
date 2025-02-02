import React from 'react';
import styled from 'styled-components';
import ReadReceipts from './ReadReceipts';

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

const CircleImage = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: auto;
`;

const Image = styled.img`
    height: 10rem;
    width: 10rem;
`;

interface MessageBubbleProps {
    isMe: boolean;
    messageId: number;
    profileURL: string;
    photoURL?: string;
    hasImage: boolean;
    text?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
    isMe,
    messageId,
    profileURL,
    photoURL,
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
             <CircleImage 
                src={profileURL} 
                style = {{ visibility }}
                alt='profile pic'
            />

            <Box style = {{ background, color }}>
                {photoURL && <Image src={photoURL} alt='content' />}
                {!photoURL && text}

                {isMe && (
                    <ReadReceipts messageId={messageId}/>
                )}
            </Box>
        </Container>
    );

}

export default MessageBubble;