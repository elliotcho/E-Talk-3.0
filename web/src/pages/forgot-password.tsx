import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/Layout';
import FormContainer from '../containers/auth/FormContainer';
import Title from '../components/auth/Title';
import InputField from '../components/shared/InputField';
import Button from '../components/shared/Button';

const ForgotPassword: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();

    return (
        <Layout>
            <Formik
                initialValues = {{ email: '' }}
                onSubmit = {async ({ email }, { setValues }) => {
                    setIsLoading(true);

                    await forgotPassword({
                        variables: { email }
                    });

                    setValues({ email: '' });
                    setIsLoading(false);
                }}
            >
                {({ values, handleChange }) => (
                    <FormContainer>
                        <Title>Forgot Password?</Title>

                        <Form>
                            <InputField
                                type = 'text'
                                placeholder = 'Email'
                                onChange = {handleChange}
                                value = {values.email}
                                name = 'email'
                            />
    
                            <Button isLoading={isLoading}>
                                Submit
                            </Button>
                        </Form>
                    </FormContainer>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(ForgotPassword);