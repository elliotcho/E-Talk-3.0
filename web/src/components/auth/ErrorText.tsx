import React from 'react';
import styled from 'styled-components';

const Error = styled.p`
    text-align: left;
    color: red;
`;

const ErrorText : React.FC<{}> = ({ children }) => (
    <Error>
        {children}
    </Error>
)

export default ErrorText;