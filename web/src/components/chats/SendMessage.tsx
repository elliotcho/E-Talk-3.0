import React, { useState } from 'react';
import styled from 'styled-components';
import { useCreateChatMutation } from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress';
import { useRouter } from 'next/router'; 

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
    const router = useRouter();

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

                        const response = await createChat({
                            variables: { members, text }
                        });

                        const chatId = response?.data?.createChat;

                        if(chatId) {
                            router.push(`/chat/${chatId}`)
                        }
                    }
                }}
            />
        </Container>
    )
}

export default SendMessage;