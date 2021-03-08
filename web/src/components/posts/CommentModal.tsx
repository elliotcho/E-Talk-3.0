import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { 
    CommentsDocument, 
    useCommentsQuery, 
    useCreateCommentMutation, 
} from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress';
import Comment from './Comment';

const Container = styled.div`
    font-family: 'Arial';
    width: 400px;
`;

const Header = styled.h3`
    text-align: left;
    color: black;
`;

const Text = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: black;
`;

const Stack = styled.div`
    max-height: 460px;
    overflow: auto;
`;

const CreatePost = styled.textarea`
    width: 100%;
    max-height: 200px;
    height: 35px;
    font-size: 1.3rem;
    margin-top: 50px;
    overflow: hidden;
    resize: none;
`;

interface CommentModalProps {
    open: boolean;
    onClose() : void;
    postOwner: number;
    postId: number;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, postId, postOwner }) => {
    const [text, setText] = useState('');

    const [createComment] = useCreateCommentMutation({
        refetchQueries: [
            { query: CommentsDocument, variables: { postId } }
        ]
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
                <Header>Comments</Header>

                {loading && (
                    <Text>
                        Loading...
                    </Text>
                )}

                <Stack>
                    {data?.comments.map(c => {
                        const props = { ...c, ...c.user };
                        delete props.user;

                        return (
                            <Comment  
                                key = {c.id}
                                commentId = {c.id}
                                postOwner = {postOwner}
                                {...props} 
                            />
                        )
                    })}

                    {!loading && !data?.comments.length && (
                        <Text>No Comments</Text>
                    )}
                </Stack>
            </Container>
            
            <CreatePost
                value = {text}
                placeholder = 'Write a comment...'
                onChange = {(e) => setText(e.target.value)}
                onKeyDown = {async (e) => {
                    const submit = handleEnterPress(e);

                    if(submit && text.trim().length !== 0) {

                        await createComment({
                            variables: { postId, text },
                            update: (cache) => {
                              
                            }
                        });
                        
                        setText('');    
                    
                    }
                }}
            />
        </Modal>
    )
}

export default CommentModal;