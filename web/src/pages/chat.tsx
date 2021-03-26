import React from 'react';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper'
import Layout from '../containers/shared/Layout';
import { useRouter } from 'next/router';

const Chats: React.FC<{}> = () => {
    const { query: { id } } = useRouter();

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Chats);