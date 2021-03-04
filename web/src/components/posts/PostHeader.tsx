import React, { useState } from 'react';
import styled from 'styled-components';
import { useDeletePostMutation, useMeQuery } from '../../generated/graphql';
import { formatDate } from '../../utils/formatDate';
import ConfirmModal from '../shared/ConfirmModal';
import EditModal from './EditModal';
import NextLink from 'next/link';

const Flex = styled.div`
    display: flex;
`;

const Image = styled.img`
    cursor: pointer;
    width: 6rem;
    height: 6rem;
`;

const Stack = styled.div`
    position: relative;
    bottom: 15px;
    left: 15px;
`;

const Primary = styled.h2`
    cursor: pointer;
    color: #0275d8;
    &:hover {
        text-decoration: underline;
    }
`;

const Muted = styled.p`
    cursor: pointer;
    color: lightslategray;
    position: relative;
    bottom: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

const Box = styled.div`
    cursor: pointer;
    position: relative;
    bottom: 10px;
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

interface PostHeaderProps {
    postId: number;
    createdAt: string;
    content: string;
    profileURL: string;
    firstName: string;
    lastName: string;
    userId: number;
}

const PostHeader: React.FC<PostHeaderProps> = ({
    postId,
    createdAt,
    content,
    profileURL,
    firstName,
    lastName,
    userId
}) => {
    const [editting, setEditting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deletePost] = useDeletePostMutation();
    const meResponse = useMeQuery();

    const toProfile = `/profile/${userId}`;
    const toPost = `/post/${postId}`;

    let isOwner = false;

    if(meResponse?.data?.me?.id === userId) {
        isOwner = true;
    }

    return (
       <>
            <Flex>
                <NextLink href={toProfile}>
                    <Image 
                        src={profileURL || '/loading.jpg'} 
                        alt='Profile pic'
                    />
                </NextLink>

                <Stack>
                    <NextLink href={toProfile}>
                        <Primary>
                            {firstName} {lastName}
                        </Primary>
                    </NextLink>

                    <NextLink href={toPost}>
                        <Muted>
                            {formatDate(createdAt)}
                        </Muted>
                    </NextLink>
                </Stack>

                {isOwner && (
                    <Box>
                        <Dropdown>
                            <Option
                                onClick = {() => {
                                   setDeleting(true)
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

            <ConfirmModal
                open = {deleting}
                body = 'Are you sure you want to delete this post?'
                onClose = {() => setDeleting(false)}
                onSubmit = {async () => {
                    await deletePost({
                        variables: { postId },
                        update: (cache) => {
                            cache.evict({ id: 'Post:' + postId });
                        }
                    });
                }} 
            />
            
            <EditModal
                open = {editting}
                postId = {postId}
                onClose = {() => setEditting(false)}
                content = {content}
            />
       </>
    )
}

export default PostHeader;