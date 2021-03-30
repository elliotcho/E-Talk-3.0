import React, { useState } from 'react';
import styled from 'styled-components';
import { useCreateChatMutation, useSendMessageMutation } from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress';
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
    background: #ccd9ff;
    position: relative;
    bottom: 2px;
    font-size: 1.4rem;
    border: none;
`;

const Textarea = styled.textarea`
    width: 90%;
    height: 35px;
    max-height: 130px;
    font-size: 1.2rem;
    overflow: hidden;
    resize: none;

    &:focus {
        outline: none;
    }
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
            <Button>
                +
            </Button>

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
                    }

                    if(submit && isChat) {
                        await sendMessage({
                            variables: { chatId, text }
                        });
                    }
                }}
            />
        </Container>
    )
}

export default SendMessage;