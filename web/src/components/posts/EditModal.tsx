import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Modal } from 'react-responsive-modal';
import { useEditPostMutation } from '../../generated/graphql';
import 'react-responsive-modal/styles.css';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2``;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    resize: none;
`;

const Footer = styled.div`
    border-top: 1px solid gray;
    padding: 25px;
`;

const Close = styled.button`
    width: 50%;
    font-size: 20px;
    background: gray;
    cursor: pointer;
    color: white;
    padding: 15px;
    outline: none;
    border: none;
    &:hover {
        background: silver;
    }
`;

const Submit = styled.button`
    width: 50%;
    font-size: 20px;
    background: green;
    cursor: pointer;
    color: white;
    padding: 15px;
    outline: none;
    border: none;
    &:hover {
        background: lightgreen;
    }
`;

interface EditModalProps {
    postId: number;
    onClose() : void;
    content: string;
    open: boolean;
}

const EditModal : React.FC<EditModalProps> = ({ postId, onClose, content, open }) => {
    const [editPost] = useEditPostMutation();

    return (
        <Modal 
            open={open} 
            closeOnEsc = {false}
            styles = {{ closeButton: { outline: 'none'} }}
            onClose={onClose}
        >
            <Container>
                <Formik
                    initialValues = {{ newContent: content }}
                    onSubmit = {async ({ newContent }) => {
                        if(newContent.trim().length === 0) {
                            return;
                        }

                        await editPost({
                            variables: { newContent, postId }
                        });

                        onClose();
                    }}
                >
                   {({ values, handleChange }) => (
                       <Form>
                            <Header>Edit Post</Header>

                            <TextArea
                                onChange = {handleChange}
                                value = {values.newContent}
                                name = 'newContent'
                            />

                            <Footer>
                                <Close onClick={onClose}>
                                    Close
                                </Close>

                                <Submit type='submit'>
                                    Save
                                </Submit>
                            </Footer>
                       </Form>
                   )}
                </Formik>
            </Container>
        </Modal>
    )
}

export default EditModal;