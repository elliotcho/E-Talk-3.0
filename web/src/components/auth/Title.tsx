import React from 'react';
import styled from 'styled-components';

const Header = styled.h3`
    margin-bottom: 20px;
    text-align: left;
    color: white;
`;

const Title: React.FC<{}> = ({ children }) => (
    <Header>
        {children}
    </Header>
)

export default Title;