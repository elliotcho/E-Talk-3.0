import React from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { useForgotPasswordMutation } from '../generated/graphql';
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


const ForgotPassword: React.FC<{}> = () => {
    const [forgotPassword] = useForgotPasswordMutation();

    return (
        <Layout>
            <Formik
                initialValues = {{ email: '' }}
                onSubmit = {async ({ email }, { setValues }) => {
                    await forgotPassword({
                        variables: { email }
                    });

                    setValues({ email: '' });
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
    
                            <Button type='submit'>
                                Submit
                            </Button>
                        </Container>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(ForgotPassword);