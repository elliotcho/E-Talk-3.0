import React from 'react';
import { Formik, Form } from 'formik';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';
import FormContainer from '../containers/auth/FormContainer';
import AuthWrapper from '../components/shared/AuthWrapper';
import Layout from '../components/shared/Layout';
import InputField from '../components/auth/InputField';
import SubmitButton from '../components/auth/SubmitButton';
import ErrorText from '../components/auth/ErrorText';
import { useRouter } from 'next/router';

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
                        <FormContainer>
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

                                <InputField
                                    type = 'text'
                                    placeholder = 'First name'
                                    onChange = {handleChange}
                                    value = {values.firstName}
                                    name = 'firstName'
                                />
                    
                                <InputField
                                    type = 'text'
                                    placeholder = 'Last name'
                                    onChange = {handleChange}
                                    value = {values.lastName}
                                    name = 'lastName'
                                />

                                <SubmitButton type='submit'>
                                    Register
                                </SubmitButton>

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

export default withApollo({ ssr: false })(Register);