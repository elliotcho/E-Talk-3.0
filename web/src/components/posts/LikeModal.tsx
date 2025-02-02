import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { useLikersQuery } from '../../generated/graphql';
import NextLink from 'next/link';

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
    margin-top: 30px;
    max-height: 460px;
    overflow: auto;
`;

const Card = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    padding: 15px 0;
    &:last-child {
        border-bottom: none;
    }
`;

const Span = styled.span`
    cursor: pointer;
    font-size: 1.4rem;
    margin-left: 15px;
    color: #0275d8;
    &:hover {
        text-decoration: underline;
    }
`;

const Image = styled.img`
    cursor: pointer;
    width: 6rem;
    height: 6rem;
`;

interface LikeModalProps {
    postId: number;
    onClose() : void;
    open: boolean;
}

const LikeModal: React.FC<LikeModalProps> = ({ postId, open, onClose }) => {
    const { data, loading } = useLikersQuery({
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
                <Header>Post liked by...</Header>

                {loading && (
                    <Text>
                        Loading...
                    </Text>
                )}

                <Stack>
                    {data?.likers.map(u => {
                        let route = `/profile/${u.id}`;

                        return (
                            <Card key={u.id}>
                                <NextLink href={route}>
                                    <Image src={u.profileURL} alt='Profile pic'/>
                                </NextLink>

                                <NextLink href={route}>
                                    <Span>
                                        {u.firstName} {u.lastName}
                                    </Span>
                                </NextLink>
                            </Card>
                        )
                    })}
                </Stack>
            </Container>
        </Modal>
    )
}

export default LikeModal;