import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../components/AuthWrapper';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

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

const Register : React.FC<{}> = () => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    return (
        <AuthWrapper>
            <Layout>
                <Formik
                    initialValues = {{ email: '', password: '', firstName: '', lastName: '' }}
                    onSubmit = {async (values, { setErrors }) => {
                        const response = await register({
                            variables: { input: { ...values } },
                            update: (cache, { data }) => {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data?.register.user
                                    }
                                });
                            }
                        });

                        if(!response.data.register.user) {
                            setErrors(toErrorMap(response.data.register.errors));
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

                                <Input
                                    type = 'text'
                                    placeholder = 'First name'
                                    onChange = {handleChange}
                                    value = {values.firstName}
                                    name = 'firstName'
                                />
                    
                                <Input 
                                    type = 'text'
                                    placeholder = 'Last name'
                                    onChange = {handleChange}
                                    value = {values.lastName}
                                    name = 'lastName'
                                />

                                <Button type='submit'>
                                    Register
                                </Button>

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

export default withApollo({ ssr: false })(Register);