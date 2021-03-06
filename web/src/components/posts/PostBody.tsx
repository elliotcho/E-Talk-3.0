import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.div`
    overflow-wrap: break-word;
    white-space: pre-wrap;
    font-size: 1.6rem;
    padding: 10px 10px;
    margin-top: 30px;
`;

const Span = styled.p`
    color: darkblue;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

interface PostBodyProps {
    postId: number;
    content: string;
    seeMore: boolean;
}

const PostBody: React.FC<PostBodyProps> = ({ postId, content, seeMore }) => {
    const router = useRouter();

    if(content.length > 300 && !seeMore) {
        return (
            <Container>
                {content}...

                <Span 
                    onClick = {() => {
                        router.push(`/post/${postId}`);
                    }}
                >
                    See More
                </Span>
            </Container>
        )
    }

    return (
        <Container>
            {content}
        </Container>
    )
}

export default PostBody;