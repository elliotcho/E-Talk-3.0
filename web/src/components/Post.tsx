import React from 'react';
import styled from 'styled-components';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

const Container = styled.div`
    width: 600px;
    margin: 30px auto;
    background: white;
    padding: 15px;
    color: black;
`;

const Header = styled.h2`
    cursor: pointer;
    color: #0275d8;
    position: relative;
    bottom: 5px;
    &:hover {
        text-decoration: underline;
    }
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

const Text = styled.div``;

interface PostProps {
    postId: number;
    createdAt: string;
    content: string;
    firstName: string;
    lastName: string;
    userId: number;
}

const Post : React.FC<PostProps> = ({ postId, content, firstName, lastName, userId }) => {
    let isOwner = false;

    const meResponse = useMeQuery();
    const [deletePost] = useDeletePostMutation();

    if(meResponse.data.me.id === userId) {
        isOwner = true;
    }

    return (
        <Container>
            <Flex>
                <Header>
                    {firstName} {lastName}
                </Header>

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

            <Text>
                {content}
            </Text>
        </Container>
    )
}

export default Post;