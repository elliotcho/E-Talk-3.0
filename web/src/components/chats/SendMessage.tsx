import React, { useState } from 'react';
import styled from 'styled-components';
import { useCreateChatMutation } from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress'; 

const Container = styled.div`
    display: grid; 
    grid-template-columns: 50px auto;
    padding: 20px;
`;

const Textarea = styled.textarea`
    width: 90%;
    height: 35px;
    max-height: 130px;
    font-size: 1.2rem;
    overflow: hidden;
    resize: none;
`;

interface SendMessageProps {
    recipients: any[];
}

const SendMessage : React.FC<SendMessageProps> = ({ recipients }) => {
    const [text, setText] = useState('');

    const [createChat] = useCreateChatMutation();

    return (
        <Container>
            <div></div>

            <Textarea
                value = {text}
                placeholder = 'Your message here...'
                onChange = {(e) => setText(e.target.value)}
                onKeyDown = {async (e) => {
                    const submit = handleEnterPress(e, 130);

                    if(submit) {
                        const members = recipients.map(r => r.id);

                        await createChat({
                            variables: { members, text }
                        });
                    }
                }}
            />
        </Container>
    )
}

export default SendMessage;