import React from 'react';
import styled from 'styled-components';
import { useMeQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { isServer } from '../utils/isServer';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import ChangeEmailForm from '../containers/settings/ChangeEmailForm';
import ChangeNameForm from '../containers/settings/ChangeNameForm';
import NextLink from 'next/link';

const Container = styled.div`
    color: black;
    background: #fff;
    margin: 50px auto;
    max-width: 800px;
    width: 90%;
`;

const Details = styled.details`
    border: solid black 1px;
    padding: 30px;
`;

const Summary = styled.summary`
    &:focus {
        outline: none;
    }
`;

const Link = styled.h3`
    cursor: pointer;
    color: #0275d8;
    text-align: center;
    margin-top: 50px;
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
                    <Details>
                        <Summary>Change Email</Summary>

                        <ChangeEmailForm 
                            userId={userId} 
                            email={email}
                        />
                    </Details>

                    <Details>
                        <Summary>Change Name</Summary>

                        <ChangeNameForm
                            userId = {userId}
                            firstName = {firstName}
                            lastName = {lastName}
                        />
                    </Details>

                    <Details>
                        <Summary>Change Password</Summary>

                        <NextLink href='/forgot-password'>
                            <Link>
                                Click here!
                            </Link>
                        </NextLink>
                    </Details>
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Settings);