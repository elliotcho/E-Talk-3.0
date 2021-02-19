import React from 'react';
import styled from 'styled-components';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';
import { formatDate } from '../utils/formatDate';
import { useRouter } from 'next/router';

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 30px auto;
    background: white;
    border: 1px solid black;
    padding: 15px;
    color: black;
`;

const Primary = styled.h2`
    cursor: pointer;
    color: #0275d8;
    position: relative;
    bottom: 5px;
    &:hover {
        text-decoration: underline;
    }
`;

const Muted = styled.p`
    color: lightslategray;
    margin-top: 0;
`;

const Flex = styled.div`
    display: flex;
`;

const Box = styled.div`
    cursor: pointer;
    position: relative;
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
    top: 10px;
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

const Text = styled.div`
    font-size: 1.4rem;
    margin-left: 15px;
    padding: 2rem 0;
`;

interface PostProps {
    postId: number;
    createdAt: string;
    content: string;
    userURL: string;
    firstName: string;
    lastName: string;
    userId: number;
}

const Post : React.FC<PostProps> = ({ 
    postId, 
    createdAt,
    content, 
    firstName, 
    lastName, 
    userId 
}) => {
    const router = useRouter();
    const [deletePost] = useDeletePostMutation();
    const meResponse = useMeQuery();

    let isOwner = false;

    if(meResponse.data.me.id === userId) {
        isOwner = true;
    }

    return (
        <Container>
            <Flex>
                <Primary 
                    onClick = {() => {
                        router.push(`/profile/${userId}`)
                    }}
                >
                    {firstName} {lastName}
                </Primary>

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

                            <Option>
                                Edit
                            </Option>
                        </Dropdown>   
                        ...
                    </Box>
                )}
            </Flex>

            <Muted>
                {formatDate(createdAt)}
            </Muted>

            <Text>
                {content}
            </Text>
        </Container>
    )
}

export default Post;