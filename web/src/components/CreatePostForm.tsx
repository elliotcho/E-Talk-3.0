import React from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { Post, useCreatePostMutation } from '../generated/graphql';

const Container = styled.div`
    width: 600px;
    margin: 50px auto;
    text-align: center;
`;

const Header = styled.h2`
    text-align: left;
    color: white;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    resize: none;
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

const CreatePostForm: React.FC<{}> = () => {
    const [createPost] = useCreatePostMutation();

    return (
        <Formik
            initialValues = {{ content: '' }}
            onSubmit = {async ({ content }, { setValues }) => {
                await createPost({
                    variables: { content },
                    update: (cache, { data }) => {
                        const query = gql`
                            query Posts {
                                posts {
                                    id
                                    content
                                    createdAt
                                }
                            }
                        `

                        const prevQuery = cache.readQuery({ query }) as { posts: Post[] };
                        const newPost = data.createPost;

                        cache.writeQuery({
                            data: { posts: [newPost, ...prevQuery.posts] },
                            query
                        });
                    }
                });

                setValues({ content: '' });
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <Container>
                        <Header>
                            What's on your mind?
                        </Header>

                        <TextArea
                            value = {values.content}
                            onChange = {handleChange}
                            name = 'content'
                        />

                        <Button type='submit'>
                            Submit
                        </Button>
                    </Container>
                </Form>
            )}
        </Formik>        
    )
}

export default CreatePostForm;