import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { 
    CommentsDocument, 
    PostDocument, 
    PostsDocument, 
    useCommentsQuery, 
    useCreateCommentMutation, 
    UserPostsDocument
} from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress';
import Comment from './Comment';

const Container = styled.div`
    width: 400px;
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

const Stack = styled.div`
    max-height: 460px;
    overflow: auto;
`;

const CreatePost = styled.textarea`
    width: 100%;
    max-height: 200px;
    height: 25px;
    font-size: 1.4rem;
    margin-top: 50px;
    overflow: hidden;
    resize: none;
`;

interface CommentModalProps {
    open: boolean;
    onClose() : void;
    postId: number;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, postId }) => {
    const [text, setText] = useState('');

    const [createComment] = useCreateCommentMutation({
        refetchQueries: [
            { query: CommentsDocument, variables: { postId } },
            { query: PostDocument, variables: { postId } },
            { query: UserPostsDocument },
            { query: PostsDocument },
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
                                {...props} 
                            />
                        )
                    })}

                    {!loading && !data?.comments && (
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
                            variables: { postId, text }
                        });
                        
                        setText('');    
                    
                    }
                }}
            />
        </Modal>
    )
}

export default CommentModal;