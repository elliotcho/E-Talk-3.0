import React, { useState } from 'react';
import styled from 'styled-components';
import { useCreateChatMutation, useSendMessageMutation } from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress';
import { isServer } from '../../utils/isServer';
import { useRouter } from 'next/router'; 

const Container = styled.div`
    display: grid; 
    grid-template-columns: 50px auto;
    grid-gap: 30px;
    background: #bfbfbf;
    padding: 20px;
`;

const Button = styled.button`
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    background: #1ac6ff;
    color: white;
    position: relative;
    bottom: 3px;
    font-size: 1.4rem;
    border: none;

    &:hover {
        box-shadow: 0 0 5px black;
    }
`;

const Textarea = styled.textarea`
    width: 90%;
    height: 35px;
    max-height: 130px;
    font-size: 1.2rem;
    border-radius: 11px;
    overflow: hidden;
    resize: none;

    &:focus {
        outline: none;
    }
`;

const Input = styled.input`
    display: none;
`;

interface SendMessageProps {
    isChat: boolean;
    recipients: any[];
    chatId: number;
}

const SendMessage : React.FC<SendMessageProps> = ({ recipients, isChat, chatId }) => {
    const [text, setText] = useState('');
    const [createChat] = useCreateChatMutation();
    const [sendMessage] = useSendMessageMutation();
    const router = useRouter();

    return (
        <Container>
            <Button
                onClick = {() => {
                    if(!isServer()) {
                        document.getElementById('file').click();
                    }
                }}
            >
                +
            </Button>

            <Input
                id = 'file'
                type = 'file'
                onClick = {() => {
                    
                }}
            />  

            <Textarea
                value = {text}
                placeholder = 'Your message here...'
                onChange = {(e) => setText(e.target.value)}
                onKeyDown = {async (e) => {
                    const submit = handleEnterPress(e, 130);

                    if(submit && !isChat) {
                        const members = recipients.map(r => r.id);

                        const response = await createChat({
                            variables: { members, text }
                        });

                        const chatId = response?.data?.createChat;

                        if(chatId) {
                            router.push(`/chat/${chatId}`)
                        }

                        setText('');
                    }

                    if(submit && isChat) {
                        await sendMessage({
                            variables: { chatId, text }
                        });

                        setText('');
                    }
                }}
            />
        </Container>
    )
}

export default SendMessage;