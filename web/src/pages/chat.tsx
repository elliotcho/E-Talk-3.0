import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper'
import Layout from '../containers/shared/Layout';
import Sidebar from '../containers/chats/Sidebar';
import ChatHeader from '../components/chats/ChatHeader';
import ChatContainer from '../containers/chats/ChatContainer';
import SendMessage from '../components/chats/SendMessage';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 92vh;
`;

const Main = styled.div`
    display: grid;
    grid-template-rows: 1fr 8.5fr auto;
    grid-row-gap: 0;
`;

const Chats: React.FC<{}> = () => {
    const { query: { id } } = useRouter();

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <Container>
                    <Sidebar />
                    
                    <Main>
                        <ChatHeader />

                        <ChatContainer />

                        <SendMessage />
                    </Main>
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Chats);