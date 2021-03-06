import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { 
    PostsDocument,
    useCreatePostMutation, 
    useMeQuery, 
    UserPostsDocument
} from '../../generated/graphql';

const Container = styled.div`
    width: 90%;
    margin: 50px auto;
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
    const userId = useMeQuery()?.data?.me?.id;

    const [createPost] = useCreatePostMutation({
        refetchQueries: [
            { query: UserPostsDocument, variables: { userId } },
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