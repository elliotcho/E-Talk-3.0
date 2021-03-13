import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import FormContainer from '../containers/auth/FormContainer';
import Title from '../components/auth/Title';
import InputField from '../components/auth/InputField';
import Button from '../components/shared/Button';
import ErrorText from '../components/auth/ErrorText';
import { useRouter } from 'next/router';

const Register : React.FC<{}> = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [register] = useRegisterMutation();

    return (
        <AuthWrapper>
            <Layout>
                <Formik
                    initialValues = {{ email: '', password: '', firstName: '', lastName: '' }}
                    onSubmit = {async (values, { setErrors }) => {
                        setIsLoading(true);

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

                                cache.evict({ fieldName: 'posts' });
                            }
                        });

                        if(!response.data.register.user) {
                            setErrors(toErrorMap(response.data.register.errors));
                        } else {
                            router.push('/');
                        }

                        setIsLoading(false);
                    }}
                >
                    {({ values, handleChange, errors }) => (
                        <FormContainer>
                            <Title>Register</Title>

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

                                <Button isLoading={isLoading}>
                                    Register
                                </Button>

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