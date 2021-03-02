import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const Container = styled.div`
    width: 400px;
`;

const CommentModal: React.FC<{}> = () => {
    return (
        <Modal
            open={false} 
            closeOnEsc = {false}
            styles = {{ closeButton: { outline: 'none'} }}
            onClose={() => {}}
        >
            <Container>
                
            </Container>
        </Modal>
    )
}

export default CommentModal;