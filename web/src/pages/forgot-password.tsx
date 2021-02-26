import React from 'react';
import { Form, Formik } from 'formik';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import FormContainer from '../containers/auth/FormContainer';
import AuthWrapper from '../components/shared/AuthWrapper';
import Layout from '../components/shared/Layout';
import InputField from '../components/auth/InputField';
import SubmitButton from '../components/auth/SubmitButton';

const ForgotPassword: React.FC<{}> = () => {
    const [forgotPassword] = useForgotPasswordMutation();

    return (
        <AuthWrapper>
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
                        <FormContainer>
                            <Form>
                                <InputField
                                    type = 'text'
                                    placeholder = 'Email'
                                    onChange = {handleChange}
                                    value = {values.email}
                                    name = 'email'
                                />
        
                                <SubmitButton>
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