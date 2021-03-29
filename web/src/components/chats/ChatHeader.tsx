import React from 'react';
import styled from 'styled-components';

const Header = styled.h2`
    display: flex;
    align-items: center;
    background: green;
    color: white;
    margin: 0;
`;

const Span = styled.span`
    margin-left: 20px;
`;

interface ChatHeaderProps {
    title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
    return (
        <Header>
            <Span>
                {title}
            </Span>
        </Header>
    )
}

export default ChatHeader;