import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 50%;
    font-size: 20px;
    background: green;
    color: white;
    margin: 20px auto;
    padding: 15px;
    cursor: pointer;
    outline: none;
    border: none;
    &:hover {
        box-shadow: 0 0 5px black;
    }
`;

interface SubmitButtonProps {
    isLoading?: boolean;
}

const SubmitButton : React.FC<SubmitButtonProps> = ({ children, isLoading = false }) => {
    let type : 'submit' | 'button' | 'reset';

    if(isLoading) {
        type = 'button';
    } else {
        type = 'submit';
    }

    return (
        <Button type = {type}>
            {isLoading? 'Loading...' : children}
        </Button>
    )
}

export default SubmitButton;