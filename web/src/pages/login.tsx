import React from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import Layout from '../components/Layout';

const Container = styled.div`
    width: 400px;
    text-align: center;
    margin: 0 auto;
`;

const Input = styled.input`
    width: 100%;
    display: block;
    margin-bottom: 5px;
    padding: 6px;
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

const Login: React.FC<{}> = () => {
    const [login] = useLoginMutation();

    return (
        <Layout>
            <Formik
                initialValues = {{ email: '', password: '' }}
                onSubmit = {async (values, { setValues }) => {
                    await login({
                        variables: { input: { ...values } }
                    });

                    setValues({ email: '' , password: ''});
                }}
            >
                {({ values, handleChange }) => (
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
                        </Container>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(Login);