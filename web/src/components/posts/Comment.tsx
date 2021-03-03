import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/formatDate'; 
import NextLink from 'next/link';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

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
    margin-top: 0px;
`;

interface CommentProps {
    text: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    profileURL: string;
    userId: number;
}

const Comment: React.FC<CommentProps> = ({
    text,
    createdAt,
    firstName,
    lastName,
    profileURL,
    userId
}) => {
    const meResponse = useMeQuery({
        skip: isServer()
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
                                onClick = {async () => {
                                   
                                }}
                            >
                                Delete
                            </Option>

                            <Option 
                                onClick = {() => {
                                  
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
        </Card>
    )
}

export default Comment;