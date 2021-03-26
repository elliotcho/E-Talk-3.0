import React from 'react';
import styled from 'styled-components';
import { useMeQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { isServer } from '../utils/isServer';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import ChangeEmailForm from '../containers/settings/ChangeEmailForm';
import ChangeNameForm from '../containers/settings/ChangeNameForm';
import Details from '../components/settings/Details';
import NextLink from 'next/link';

const Container = styled.div`
    color: black;
    background: #fff;
    margin: 50px auto;
    max-width: 800px;
    width: 90%;
`;

const Link = styled.h3`
    cursor: pointer;
    color: #0275d8;
    margin: 50px auto 0;
    width: fit-content;
    &:hover {
        text-decoration: underline;
    }
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
                    <Details summary='Change Email'>
                        <ChangeEmailForm userId={userId} email={email} />
                    </Details>

                    <Details summary='Change Name'>
                        <ChangeNameForm
                            userId = {userId}
                            firstName = {firstName}
                            lastName = {lastName}
                        />
                    </Details>

                    <Details summary='Change Password'>
                        <NextLink href='/forgot-password'>
                            <Link>
                                Click Here
                            </Link>
                        </NextLink>
                    </Details>
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Settings);