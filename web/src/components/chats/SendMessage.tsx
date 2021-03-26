import React, { useState } from 'react';
import styled from 'styled-components';
import { handleEnterPress } from '../../utils/handleEnterPress'; 

const Container = styled.div`
    display: grid; 
    grid-template-columns: 100px auto;
    padding: 20px;
`;

const Textarea = styled.textarea`
    width: 90%;
    max-height: 130px;
    height: 35px;
    font-size: 1.3rem;
    overflow: hidden;
    resize: none;
`;

const SendMessage : React.FC<{}> = () => {
    const [text, setText] = useState('');

    return (
        <Container>
            <div></div>

            <Textarea
                value = {text}
                placeholder = 'Your message here...'
                onChange = {(e) => setText(e.target.value)}
                onKeyDown = {(e) => {
                    handleEnterPress(e, 130);
                }}
            />
        </Container>
    )
}

export default SendMessage;