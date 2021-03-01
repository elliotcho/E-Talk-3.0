import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { useLikersQuery } from '../../generated/graphql';
import NextLink from 'next/link';

const Container = styled.div`
    width: 400px;
`;

const Title = styled.h2`
    color: black;
`;

const Loading = styled.h2`
   text-align: center;
   color: white;
`;

const Card = styled.div`
    display: flex;
    align-items: center;
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
                <Title>Post liked by...</Title>

                {loading && (
                    <Loading>
                        Loading...
                    </Loading>
                )}

                {data?.likers.map(u => {
                    let route = `/profile/${u.id}`;

                    return (
                        <Card>
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
            </Container>
        </Modal>
    )
}

export default LikeModal;