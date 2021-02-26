import React, { useState } from 'react';
import styled from 'styled-components';
import { useDeletePostMutation, useMeQuery } from '../../generated/graphql';
import { formatDate } from '../../utils/formatDate';
import EditModal from './EditModal';
import { useRouter } from 'next/router';

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
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const [deletePost] = useDeletePostMutation();
    const meResponse = useMeQuery();

    const toProfile = () => router.push(`/profile/${userId}`);
    const toPost = () => router.push(`/post/${postId}`);

    let isOwner = false;

    if(meResponse?.data?.me?.id === userId) {
        isOwner = true;
    }

    return (
       <>
            <Flex>
                <Image 
                    src={profileURL} 
                    alt='Profile pic'
                    onClick = {toProfile}
                />

                <Stack>
                    <Primary onClick={toProfile}>
                        {firstName} {lastName}
                    </Primary>

                    <Muted onClick={toPost}>
                        {formatDate(createdAt)}
                    </Muted>
                </Stack>

                {isOwner && (
                    <Box>
                        <Dropdown>
                            <Option
                                onClick = {async () => {
                                    await deletePost({
                                        variables: { postId },
                                        update: (cache) => {
                                            cache.evict({ id: 'Post:' + postId });
                                        }
                                    });
                                }}
                            >
                                Delete
                            </Option>

                            <Option 
                                onClick = {() => {
                                    setIsOpen(true);
                                }}
                            >
                                Edit
                            </Option>
                        </Dropdown>   
                        ...
                    </Box>
                )}
            </Flex>
            
            <EditModal
                open = {isOpen}
                onClose = {() => setIsOpen(false)}
                postId = {postId}
                content = {content}
            />
       </>
    )
}

export default PostHeader;