import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/formatDate';
import NextLink from 'next/link';

const Container  = styled.div`
    cursor: pointer;
    background: #e6e6e6;
    padding: 15px;

    &:hover {
        background: lightblue;
    }
`;

const Flex = styled.div`
    display: flex;
`;

const Image = styled.img`
    border-radius: 50%;
    height: 4rem;
    width: 4rem; 
`;

const Box = styled.div`
    margin-left: 10px;
    color: black;
`;


const Header = styled.h4`
    margin: 0 auto;
`;

const Text = styled.p`
    margin: 0 auto;
`;

interface ChatCardProps {
    route: string;
    text: string;
    isActive: boolean;
    updatedAt: string;
    picture: string;
    title: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ route, updatedAt, text, picture, isActive, title }) => {
    let style = {};

    if(isActive) {
        style = { background: 'lightblue' };
    }

    return (
        <NextLink href={route}>
            <Container style={style}>
                <Flex>
                    <Image src={picture} alt='Profile Pic'/>

                    <Box>
                        <Header>{title}</Header>
                        
                        <Text>
                            {text}
                        </Text>
                
                        {formatDate(updatedAt)}
                    </Box>
                </Flex>
            </Container>
        </NextLink>
    )
}

export default ChatCard;