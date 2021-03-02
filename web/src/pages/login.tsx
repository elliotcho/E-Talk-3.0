import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { toErrorMap } from '../utils/toErrorMap';
import FormContainer from '../containers/auth/FormContainer';
import AuthWrapper from '../components/shared/AuthWrapper';
import Layout from '../components/shared/Layout';
import Title from '../components/auth/Title';
import InputField from '../components/auth/InputField';
import SubmitButton from '../components/auth/SubmitButton';
import ErrorText from '../components/auth/ErrorText';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Link = styled.p`
    cursor: pointer;
    text-align: left;
    &:hover {
        text-decoration: underline;
    }
`;

const Login: React.FC<{}> = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [login] = useLoginMutation();

    return (
       <AuthWrapper>
            <Layout>
                <Formik
                    initialValues = {{ email: '', password: '' }}
                    onSubmit = {async (values, { setErrors }) => {
                        setIsLoading(true);

                        const response = await login({
                            variables: { input: { ...values } },
                            update: (cache, { data }) => {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data?.login.user
                                    }
                                });

                                cache.evict({ fieldName: 'posts:{}' })
                            }
                        });

                        if(!response.data.login.user) {
                            setErrors(toErrorMap(response.data.login.errors));
                        } else {
                            router.push('/');
                        }

                        setIsLoading(false);
                    }}
                >
                    {({ values, handleChange, errors }) => (
                        <FormContainer>
                            <Title>Sign In</Title>

                            <Form>
                                <InputField
                                    type = 'text'
                                    placeholder = 'Email'
                                    onChange = {handleChange}
                                    value = {values.email}
                                    name = 'email'
                                />
                    
                                <InputField
                                    type = 'password'
                                    placeholder = 'Password'
                                    onChange = {handleChange}
                                    value = {values.password}
                                    name = 'password'
                                />

                                <SubmitButton isLoading={isLoading}>
                                    Login
                                </SubmitButton>

                                <NextLink href='forgot-password'>
                                    <Link>
                                        Forgot password?
                                    </Link>
                                </NextLink>

                                {Object.keys(errors).map(key => 
                                    <ErrorText>
                                        {`${key} error: ${errors[key]}`}
                                    </ErrorText>    
                                )}
                            </Form>
                        </FormContainer>
                    )}
                </Formik>
            </Layout>
       </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Login);