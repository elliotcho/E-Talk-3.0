import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { withApollo } from '../../utils/withApollo';
import FormContainer from '../../containers/auth/FormContainer';
import Layout from '../../components/shared/Layout';
import Title from '../../components/auth/Title';
import InputField from '../../components/auth/InputField';
import SubmitButton from '../../components/auth/SubmitButton';
import ErrorText from '../../components/auth/ErrorText';
import { useRouter } from 'next/router';

const ChangePassword: React.FC<{}> = () => {
    const  router  = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [changePassword] = useChangePasswordMutation();

    const { token } = router.query;

    return (
        <Layout>
            <Formik
                initialValues={{ newPassword: '' }}
                onSubmit={async ({ newPassword }, { setErrors }) => {
                    setIsLoading(true);

                    const response = await changePassword({
                        variables: {
                            token: typeof token === 'string' ? token: '',
                            newPassword
                        },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument, 
                                data: {
                                    __typename: 'Query',
                                    me: data?.changePassword.user
                                }
                            });

                            cache.evict({ fieldName: 'posts:{}' })
                        }
                    });

                    if(!response.data.changePassword.user) {
                        setErrors(toErrorMap(response.data.changePassword.errors));
                    } else {
                        router.push('/');
                    }

                    setIsLoading(false);
                }}
            >
                {({ values, handleChange, errors }) => (
                    <FormContainer>
                        <Title>Change Password</Title>

                        <Form>
                            <InputField
                                 type = 'password'
                                 placeholder = 'New password'
                                 onChange = {handleChange}
                                 value = {values.newPassword}
                                 name = 'newPassword'
                            />

                            <SubmitButton isLoading={isLoading}>
                                Submit
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
    )
}

export default withApollo({ ssr: false })(ChangePassword);