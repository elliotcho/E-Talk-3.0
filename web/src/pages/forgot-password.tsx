import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import FormContainer from '../containers/auth/FormContainer';
import Title from '../components/auth/Title';
import InputField from '../components/auth/InputField';
import SubmitButton from '../components/shared/SubmitButton';

const ForgotPassword: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();

    return (
        <AuthWrapper>
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
        
                                <SubmitButton isLoading={isLoading}>
                                    Submit
                                </SubmitButton>
                            </Form>
                        </FormContainer>
                    )}
                </Formik>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(ForgotPassword);