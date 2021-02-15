import React from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { withApollo } from '../../utils/withApollo';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

const Container = styled.div`
    width: 400px;
    text-align: center;
    margin: 50px auto;
`;

const Input = styled.input`
    width: 100%;
    display: block;
    margin-bottom: 5px;
    padding: 6px;
`;

const Error = styled.p`
    text-align: left;
    color: red;
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

const ChangePassword: React.FC<{}> = () => {
    const router = useRouter();
    const [changePassword] = useChangePasswordMutation();

    return (
        <Layout>
            <Formik
                initialValues={{ newPassword: '' }}
                onSubmit={async ({ newPassword }, { setErrors }) => {
                    const { token } = router.query; 

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
                        }
                    });

                    if(!response.data.changePassword.user) {
                        setErrors(toErrorMap(response.data.changePassword.errors));
                    } else {
                        router.push('/');
                    }
                }}
            >
                {({ values, handleChange, errors }) => (
                    <Form>
                        <Container>
                            <Input
                                 type = 'password'
                                 placeholder = 'New password'
                                 onChange = {handleChange}
                                 value = {values.newPassword}
                                 name = 'newPassword'
                            />

                            <Button type='submit'>
                                Submit
                            </Button>

                            {Object.keys(errors).map(key => 
                                <Error>
                                    {`${key} error: ${errors[key]}`}
                                </Error>    
                            )}
                        </Container>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(ChangePassword);