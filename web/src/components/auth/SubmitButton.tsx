import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 50%;
    font-size: 20px;
    background: green;
    cursor: pointer;
    color: white;
    padding: 15px;
    outline: none;
    border: none;
    &:hover {
        box-shadow: 0 0 5px black;
    }
`;

const SubmitButton : React.FC<{}> = ({ children }) => (
    <Button type = 'submit'>
        {children}
    </Button>
);

export default SubmitButton;