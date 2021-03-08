import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useCreatePostMutation } from '../../generated/graphql';
import Button from '../../components/shared/Button';

const Container = styled.div`
    width: 90%;
    margin: 40px auto;
    text-align: center;
    max-width: 600px;
`;

const Header = styled.h3`
    font-family: 'Arial';
    text-align: left;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    font-size: 1.3rem;
    resize: none;
`;

interface CreatePostFormProps {
    variant?: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ variant = 'white' }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [createPost] = useCreatePostMutation();
    
    const headerColor = { color: variant };

    return (
        <Formik
            initialValues = {{ content: '' }}
            onSubmit = {async ({ content }, { setValues }) => {
                if(content.trim().length === 0) {
                    return;
                }

                setIsLoading(true);

                await createPost({
                    variables: { content },
                    update: (cache) => {
                        cache.evict({ fieldName: 'posts' });  
                        cache.evict({ fieldName: 'userPosts' });   
                    }
                });

                setValues({ content: '' });
                setIsLoading(false);
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <Container>
                        <Header style={headerColor}>
                            What's on your mind?
                        </Header>

                        <TextArea
                            value = {values.content}
                            onChange = {handleChange}
                            name = 'content'
                        />

                        <Button isLoading={isLoading}>
                            Submit
                        </Button>
                    </Container>
                </Form>
            )}
        </Formik>        
    )
}

export default CreatePostForm;