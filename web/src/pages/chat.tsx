import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSeeChatsMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper'
import Layout from '../containers/shared/Layout';
import Sidebar from '../containers/chats/Sidebar';
import ChatWindow from '../containers/chats/ChatWindow';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: grid;
    grid-template-columns: 400px 1fr;
    height: 92vh;
`;

const Chats: React.FC<{}> = () => {
    const [seeChats] = useSeeChatsMutation();
    const { query: { id } } = useRouter();
    let chatId = -1;

    useEffect(() => {
        const onMount = async () => {
            await seeChats({
                update: (cache) => {
                    cache.evict({ fieldName: 'me' });
                }
            });
        }

        onMount();
    }, [])

    if(typeof id === 'string') {
        chatId = parseInt(id);
    }

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <Container>
                    <Sidebar chatId={chatId}/>
                    
                    <>
                        <ChatWindow chatId={chatId}/>
                    </>
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Chats);