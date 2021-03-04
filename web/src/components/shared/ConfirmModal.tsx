import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2`
    text-align: left;
    color: black;
`;

const Body = styled.div`
    padding: 20px 10px;
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

const Confirm = styled.button`
    ${ButtonStyles}
    background: red;
    &:hover {
        background: orangered;
    }
`;

interface ConfirmModalProps {
    open: boolean;
    body: string;
    onSubmit() : void;
    onClose() : void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, body, onSubmit, onClose }) => {
    const handleConfirm = () => {
        onSubmit();
        onClose();
    }

    return (
        <Modal
            open = {open}
            closeOnEsc = {false}
            styles = {{ closeButton: { outline: 'none'} }}
            onClose={onClose}
        >
            <Container>
                <Header>E-Talk</Header>

                <Body>
                    {body}
                </Body>

                <Footer>
                    <Close onClick={onClose}>
                        Close
                    </Close>

                    <Confirm onClick={handleConfirm}>
                        Confirm
                    </Confirm>
                </Footer>
            </Container>
        </Modal>
    )
}

export default ConfirmModal;