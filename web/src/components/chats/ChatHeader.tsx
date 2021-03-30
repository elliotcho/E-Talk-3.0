import React from 'react';
import styled from 'styled-components';

const Header = styled.h2`
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    background: #f2f2f2;
    margin: 0;
`;

const Span = styled.span`
    font-size: 1.4rem;
    color: #737373;
`;

const Image = styled.img`
    margin: auto 10px;
    border-radius: 50%;
    height: 3.5rem;
    width: 3.5rem;
`;

interface ChatHeaderProps {
    title: string;
    picture: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, picture }) => {
    return (
        <Header>
            <Image src={picture} alt='pic' />

            <Span>
                {title}
            </Span>
        </Header>
    )
}

export default ChatHeader;