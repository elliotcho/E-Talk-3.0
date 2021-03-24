import React from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { 
    useMeQuery,
    useUpdateEmailMutation, 
    useUpdateNameMutation 
} from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { isServer } from '../utils/isServer';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import FormContainer from '../containers/auth/FormContainer';
import Button from '../components/shared/Button';
import InputField from '../components/auth/InputField';
//import ErrorText from '../components/auth/ErrorText';
import Title from '../components/auth/Title';

const Settings: React.FC<{}> = () => {
    const { data } = useMeQuery({
        skip: isServer()
    });

    const [changeEmail] = useUpdateEmailMutation();
    const [changeName] = useUpdateNameMutation();

    const userId = data?.me?.id || -1;
    const email = data?.me?.email || '';

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <Formik
                    enableReinitialize
                    initialValues = {{ newEmail: email }}
                    onSubmit = {async ({ newEmail }) => {
                        if(!newEmail.trim().length) {
                            return;
                        }

                        const response = await changeEmail({ 
                            variables: { newEmail },
                            update: (cache) => {
                                const newData = { email: newEmail };

                                cache.writeFragment({
                                    id: 'User:' + userId,
                                    fragment: gql`
                                        fragment _ on User {
                                            email
                                        }
                                    `,
                                    data: newData
                                })
                            }
                        });

                        if(!response?.data?.updateEmail) {
                            alert("Email is taken");
                        }
                    }}
                >
                    {({ values, handleChange, isSubmitting }) => (
                        <FormContainer>
                            <Form>
                                <Title>Change your email</Title>

                                <InputField
                                    type = 'text'
                                    onChange = {handleChange}
                                    value = {values.newEmail}
                                    name = 'newEmail'
                                />

                                <Button isLoading={isSubmitting}>
                                    Submit
                                </Button>
                            </Form>
                        </FormContainer>
                    )}
                </Formik>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Settings);