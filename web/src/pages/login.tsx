import React from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { toErrorMap } from '../utils/toErrorMap';
import AuthWrapper from '../components/AuthWrapper';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Container = styled.div`
    width: 400px;
    text-align: center;
    margin: 50px auto;
`;

const Input = styled.input`
    width: 100%;
    display: block;
    margin-bottom: 5px;
    padding: 6px;
`;

const Error = styled.p`
    text-align: left;
    color: red;
`;

const Button = styled.button`
    width: 50%;
    font-size: 20px;
    background: green;
    cursor: pointer;
    color: white;
    padding: 15px;
    outline: none;
    border: none;
    &:hover {
        background: teal;
    }
`;

const Link = styled.p`
    cursor: pointer;
    text-align: left;
    &:hover {
        text-decoration: underline;
    }
`;

const Login: React.FC<{}> = () => {
    const router = useRouter();
    const [login] = useLoginMutation();

    return (
       <AuthWrapper>
            <Layout>
                <Formik
                    initialValues = {{ email: '', password: '' }}
                    onSubmit = {async (values, { setErrors }) => {
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
                            }
                        });

                        if(!response.data.login.user) {
                            setErrors(toErrorMap(response.data.login.errors));
                        } else {
                            router.push('/');
                        }
                    }}
                >
                    {({ values, handleChange, errors }) => (
                        <Form>
                            <Container>
                                <Input
                                    type = 'text'
                                    placeholder = 'Email'
                                    onChange = {handleChange}
                                    value = {values.email}
                                    name = 'email'
                                />
                    
                                <Input
                                    type = 'password'
                                    placeholder = 'Password'
                                    onChange = {handleChange}
                                    value = {values.password}
                                    name = 'password'
                                />
                            

                                <Button type='submit'>
                                    Login
                                </Button>

                                <NextLink href='forgot-password'>
                                    <Link>
                                        Forgot password?
                                    </Link>
                                </NextLink>

                                {Object.keys(errors).map(key => 
                                    <Error>
                                        {`${key} error: ${errors[key]}`}
                                    </Error>    
                                )}
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Layout>
       </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Login);