import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { useRegisterMutation } from '../generated/graphql';
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

const Register : React.FC<{}> = () => {
    const [register] = useRegisterMutation();

    return (
        <Layout>
            <Formik
                initialValues = {{ email: '', password: '', firstName: '', lastName: '' }}
                onSubmit = {async (values, { setValues }) => {
                    const response = await register({
                        variables: { input: { ...values } }
                    });

                    console.log(response);

                    setValues({ email: '' , password: '', firstName: '', lastName: ''});
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
                        </Container>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(Register);