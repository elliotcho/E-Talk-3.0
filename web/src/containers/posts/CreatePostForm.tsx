import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { 
    PostsDocument,
    useCreatePostMutation, 
    UserPostsDocument
} from '../../generated/graphql';

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 50px auto;
    text-align: center;
`;

const Header = styled.h2`
    text-align: left;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    font-size: 1.3rem;
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
        box-shadow: 0 0 5px black;
    }
`;

interface CreatePostFormProps {
    variant?: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ variant = 'white' }) => {
    const [createPost] = useCreatePostMutation({
        refetchQueries: [
            { query: UserPostsDocument },
            { query: PostsDocument }
        ]
    })
    
    const headerColor = { color: variant };

    return (
        <Formik
            initialValues = {{ content: '' }}
            onSubmit = {async ({ content }, { setValues }) => {
                if(content.trim().length === 0) {
                    return;
                }

                await createPost({
                    variables: { content }
                });

                setValues({ content: '' });
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