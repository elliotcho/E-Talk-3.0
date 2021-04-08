import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    useCreateChatMutation, 
    useSendMessageMutation,
    useStartTypingMutation,
    useStopTypingMutation
} from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress';
import { isServer } from '../../utils/isServer';
import { useRouter } from 'next/router'; 

const Container = styled.div`
    display: grid; 
    grid-template-columns: 50px auto;
    background: #bfbfbf;
    grid-gap: 30px;
    padding: 20px;
`;

const Input = styled.input`
    display: none;
`;

const Button = styled.button`
    color: white;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.4rem;
    background: #1ac6ff;
    border-radius: 50%;
    position: relative;
    border: none;
    bottom: 3px;

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

let tO: any;

interface SendMessageProps {
    isChat: boolean;
    recipients: any[];
    chatId: number;
}

const SendMessage : React.FC<SendMessageProps> = ({ isChat, recipients, chatId }) => {
    const [text, setText] = useState('');
    const [createChat] = useCreateChatMutation();
    const [sendMessage] = useSendMessageMutation();
    const [startTyping] = useStartTypingMutation();
    const [stopTyping ] = useStopTypingMutation();
    const router = useRouter();

    const handleStopTyping = async () => {
        await stopTyping({
            variables: { chatId }
        });
    }

    const handleNewChat = async (variables: {
        members: number[],
        text?: string;
        file?: any;
    }) => {
        const response = await createChat({ 
            variables,
            update: (cache) => {
                cache.evict({ fieldName: 'chats' });
            }
        });

        const chatId = response?.data?.createChat;            
        router.push(`/chat/${chatId}`);
    }

    const handleNewMessage = async (variables: {
        chatId: number;
        text?: string;
        file?: any;
    }) => {
        await handleStopTyping();

        await sendMessage({
            variables,
            update: (cache) => {
                cache.evict({ fieldName: 'messages' });
                cache.evict({ fieldName: 'chats' });
            }
        });
    }

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
                type = 'file'
                id = 'file'
                onChange = {async (e) => {
                    const file = e.target.files[0];
                    const members= recipients.map(r => r.id);

                    if(isChat) {
                        await handleNewMessage({ chatId, file });
                    } else {
                        await handleNewChat({ members, file });
                    }
                }}
            />  

            <Textarea
                value = {text}
                placeholder = 'Your message here...'
                onChange = {async (e) => {
                    setText(e.target.value);
                    
                    if(e.target.value) {
                        await startTyping({ variables: { chatId } });

                        if(tO) {
                            clearTimeout(tO);
                        }
                        
                        tO = setTimeout(handleStopTyping, 5000);
                    } 
                    
                    else {
                        await handleStopTyping();
                    }
                }}
                onKeyDown = {async (e) => {
                    const submit = handleEnterPress(e, 130);

                    if(submit) {
                        const members= recipients.map(r => r.id);

                        if(isChat) {
                            await handleNewMessage({ chatId, text });
                        } else {
                            await handleNewChat({ members, text });
                        }

                        setText('');
                        return;
                    }
                }}
            />
        </Container>
    )
}

export default SendMessage;