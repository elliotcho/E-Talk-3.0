import React from 'react';
import styled from 'styled-components';
import { useMeQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { isServer } from '../utils/isServer';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import ChangeEmailForm from '../containers/settings/ChangeEmailForm';
import ChangeNameForm from '../containers/settings/ChangeNameForm';

const Container = styled.div`
    color: black;
    background: #fff;
    max-width: 800px;
    margin: auto;
`;

const Settings: React.FC<{}> = () => {
    const { data } = useMeQuery({
        skip: isServer()
    });

    const userId = data?.me?.id || -1;
    const firstName = data?.me?.firstName || '';
    const lastName = data?.me?.lastName || '';
    const email = data?.me?.email || '';

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <Container>
                    <ChangeEmailForm userId={userId} email={email}/>

                    <ChangeNameForm
                        userId = {userId}
                        firstName = {firstName}
                        lastName = {lastName}
                    />
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Settings);