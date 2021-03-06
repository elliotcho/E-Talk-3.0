import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const Container = styled.div`
    font-family: 'Arial';
    width: 400px;
`;

const Header = styled.h3`
    color: black;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    font-size: 1.3rem;
    resize: none;
`;

const Footer = styled.div`
    border-top: 1px solid gray;
    padding: 25px;
`;

const ButtonStyles = `
    width: 50%;
    font-size: 20px;
    cursor: pointer;
    color: white;
    padding: 15px;
    outline: none;
    border: none;
`;

const Close = styled.button`
    ${ButtonStyles}
    background: gray;
    &:hover {
        background: silver;
    }
`;

const Submit = styled.button`
    ${ButtonStyles}
    background: green;
    &:hover {
        background: lightgreen;
    }
`;

interface EditModalProps {
    open: boolean;
    content: string;
    title: string;
    onSubmit(s: string): void;
    onClose(): void;
}

const EditModal : React.FC<EditModalProps> = ({ open, content, title, onSubmit, onClose }) => {
    const [newContent, setNewContent] = useState(content);

    const onSave = () => {
        if(newContent.trim().length !== 0) {
            onSubmit(newContent);
        }

        onClose();
    }

    return (
        <Modal 
            open={open} 
            closeOnEsc = {false}
            styles = {{ closeButton: { outline: 'none'} }}
            onClose={onClose}
        >
            <Container>
                <Header>{title}</Header>

                <TextArea
                    value = {newContent}
                    onChange = {(e) => {
                        setNewContent(e.target.value);
                    }}
                />

                <Footer>
                    <Close onClick={onClose}>
                        Close
                    </Close>

                    <Submit onClick={onSave}>
                        Save
                    </Submit>
                </Footer> 
            </Container>
        </Modal>
    )
}

export default EditModal;