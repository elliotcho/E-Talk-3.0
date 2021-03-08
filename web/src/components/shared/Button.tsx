import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 50%;
    font-size: 20px;
    background: green;
    color: white;
    margin: 20px auto;
    padding: 10px;
    cursor: pointer;
    outline: none;
    border: none;
    &:hover {
        box-shadow: 0 0 5px black;
    }
`;

interface SubmitButtonProps {
    onClick? : () => void;
    isLoading?: boolean;
    color? : string;
    bg? : string;
}

const Index : React.FC<SubmitButtonProps> = ({ 
    children, 
    onClick,
    isLoading = false,
    color,
    bg
}) => {
    let type : 'submit' | 'button' | 'reset';

    if(isLoading) {
        type = 'button';
    } else {
        type = 'submit';
    }

    return (
        <Button 
            type = {type}
            onClick = {onClick}
            style = {{ 
                background: bg, 
                color 
            }}
        >
            {isLoading? 'Loading...' : children}
        </Button>
    )
}

export default Index;