import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const Container  = styled.div`
    display: grid;
    grid-template-columns: 6rem auto;
    background: #e6e6e6;
    cursor: pointer;
    padding: 12px;

    &:hover {
        background: lightblue;
    }
`;

const Image = styled.img`
    border-radius: 50%;
    height: 4rem;
    width: 4rem; 
`;

const Box = styled.div`
    color: black;
`;

const Header = styled.h4`
    margin: 0px auto;
`;

const Text = styled.p`
    margin: 5px auto;
`;

interface ChatCardProps {
    text: string;
    isActive: boolean;
    route: string;
    picture: string;
    title: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ 
    text,
    isActive,
    route,
    picture,
    title
}) => {
    let style = {};

    if(isActive) {
        style = { background: 'lightblue' };
    }

    return (
        <NextLink href={route}>
            <Container style={style}>

                <Image src={picture} alt='Profile Pic'/>

                <Box>
                    <Header>{title}</Header>
                    
                    <Text>
                        {text}
                    </Text>
                </Box>
                
            </Container>
        </NextLink>
    )
}

export default ChatCard;