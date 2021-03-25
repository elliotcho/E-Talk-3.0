import React from 'react';
import styled from 'styled-components';

const Header = styled.h3`
    margin-bottom: 20px;
    text-align: left;
    color: white;
`;

interface TitleProps {
    color?: string;
}

const Title: React.FC<TitleProps> = ({ children, color = 'white' }) => (
    <Header style={{ color }}>
        {children}
    </Header>
)

export default Title;