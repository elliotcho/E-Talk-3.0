import React, { useState } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { 
    useMeQuery,
    useDeleteCommentMutation,
    PostsDocument,
    useEditCommentMutation,
    UserPostsDocument
} from '../../generated/graphql'
import { formatDate } from '../../utils/formatDate'; 
import ConfirmModal from '../shared/ConfirmModal';
import EditModal from './EditModal';
import NextLink from 'next/link';

const Card = styled.div`
    border: 1px solid black;
    padding: 5px;
`;

const Flex = styled.div`
    display: flex;
`;

const Image = styled.img`
    cursor: pointer;
    width: 3rem;
    height: 3rem;
`;

const Stack = styled.div`
    position: relative;
    bottom: 20px;
    left: 15px;
`;

const Primary = styled.h3`
    cursor: pointer;
    color: #0275d8;
    &:hover {
        text-decoration: underline;
    }
`;

const Muted = styled.p`
    color: lightslategray;
    position: relative;
    bottom: 10px;
`;

const Box = styled.div`
    cursor: pointer;
    position: relative;
    bottom: 15px;
    right: 10px;
    margin-left: auto;
    font-weight: bold;
    font-size: 2rem;
`;

const Dropdown = styled.div`
    z-index: 1;
    display: none;
    min-width: 160px;
    position: absolute;
    background: #f9f9f9;
    right: 0px;
    top: 15px;
    box-shadow: 0 0 5px black;
    ${Box}:hover & {
        display: block;
    }
`;

const Option = styled.div`
    padding: 10px 20px;
    font-weight: normal;
    font-size: 1rem;
    &:hover {
        background: darkblue;
        color: white;
    }
`;

const Body = styled.div`
    overflow-wrap: break-word;
    white-space: pre-wrap;
    font-size: 1.3rem;
    padding: 5px;
`;

interface CommentProps {
    commentId: number;
    createdAt: string;
    postId: number;
    text: string;
    firstName: string;
    lastName: string;
    profileURL: string;
    userId: number;
}

const Comment: React.FC<CommentProps> = ({
    commentId,
    createdAt,
    postId,
    text,
    firstName,
    lastName,
    profileURL,
    userId
}) => {
    const [editting, setEditting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [editComment] = useEditCommentMutation();
    const meResponse = useMeQuery();

    const [deleteComment] = useDeleteCommentMutation({
        refetchQueries: [
            { query: UserPostsDocument },
            { query: PostsDocument }
        ]
    });

    const toProfile = `/profile/${userId}`;
    let isOwner = false;

    if(meResponse?.data?.me?.id === userId) {
        isOwner = true;
    }

    return (
        <Card>
            <Flex>
                <NextLink href={toProfile}>
                    <Image 
                        src = {profileURL || '/loading.jpg'}
                        alt = 'profile pic'
                    />
                </NextLink>

                <Stack>
                    <NextLink href={toProfile}>
                        <Primary>
                            {firstName} {lastName}
                        </Primary>
                    </NextLink>

                    <Muted>
                        {formatDate(createdAt)}
                    </Muted>
                </Stack>

                {isOwner && (
                    <Box>
                        <Dropdown>
                            <Option
                                onClick = {() => {
                                    setDeleting(true);
                                }}
                            >
                                Delete
                            </Option>

                            <Option 
                                onClick = {() => {
                                   setEditting(true);
                                }}
                            >
                                Edit
                            </Option>
                        </Dropdown>   
                        ...
                    </Box>
                )}
            </Flex>

            <Body>{text}</Body>

            <ConfirmModal
                open = {deleting}
                onClose = {() => setDeleting(false)}
                body = 'Are you sure you want to delete this comment?'
                onSubmit = {async () => {
                    await deleteComment({
                        variables: { commentId, postId },
                        update: (cache) => {
                            cache.evict({ id: 'Comment:' + commentId })
                        }
                    });
                }}
            />

            <EditModal
                open = {editting}
                content = {text}
                title = 'Edit Comment'
                onClose = {() => setEditting(false)}
                onSubmit = {async (newContent) => {
                    await editComment({
                        variables: { commentId, newContent },
                        update: (cache) => {
                            const data ={ text: newContent };

                            cache.writeFragment({
                                data,
                                id: 'Comment:' + commentId,
                                fragment: gql`
                                  fragment _ on Comment {
                                     text
                                  }
                                `
                            });
                        }
                    });
                }}
            /> 
        </Card>
    )
}

export default Comment;