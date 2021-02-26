import React from 'react';
import styled from 'styled-components';

const Input= styled.input`
    width: 100%;
    display: block;
    font-size: 1.2rem;
    margin-bottom: 5px;
    padding: 10px;
`;

interface InputFieldProps {
    type: string;
    placeholder: string;
    onChange(e: any) : void;
    value: string;
    name: string;
}

const InputField : React.FC<InputFieldProps> = (props) => (
    <Input {...props}/>
)

export default InputField;