import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { CommentsDocument, useCommentsQuery, useCreateCommentMutation } from '../../generated/graphql';

const Container = styled.div`
    width: 400px;
`;

const Stack = styled.div`
    max-height: 460px;
    overflow: auto;
`;

const Header = styled.h2`
    text-align: left;
    color: black;
`;

const Text = styled.h2`
    margin-top: 50px;
    text-align: center;
    color: black;
`;

const CreatePost = styled.textarea`
    width: 100%;
    font-size: 1.2rem;
    margin-top: 50px;
    resize: none;
`;

interface CommentModalProps {
    open: boolean;
    onClose() : void;
    postId: number;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, postId }) => {
    const [createComment] = useCreateCommentMutation({
        refetchQueries: [{
            query: CommentsDocument,
            variables: { postId }
        }]
    });

    const { loading, data } = useCommentsQuery({
        variables: { postId }
    });

    return (
        <Modal
            open={open} 
            closeOnEsc = {false}
            styles = {{ closeButton: { outline: 'none'} }}
            onClose={onClose}
        >
            <Container>
                <Stack>
                    <Header>Comments</Header>

                    {loading && (
                        <Text>
                            Loading...
                        </Text>
                    )}

                    {!data?.comments && (
                        <Text>No Comments</Text>
                    )}
                </Stack>
            </Container>
            
            <CreatePost

            />
        </Modal>
    )
}

export default CommentModal;