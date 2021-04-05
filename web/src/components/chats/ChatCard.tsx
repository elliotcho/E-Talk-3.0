import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
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

const Span = styled.span`
    margin-left: 10px;
`;

interface ChatCardProps {
    text?: string;
    photoURL?: string;
    isActive: boolean;
    isRead: boolean;
    picture: string;
    route: string;
    title: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ 
    text,
    photoURL,
    isActive,
    isRead,
    picture,
    route,
    title
}) => {
    let background = '';
    let textSnippet = text;
    let fontWeight : any;
    
    if(isActive) {
        background = 'lightblue';
    }

    if(textSnippet && textSnippet.length > 30) {
        textSnippet = `${text.substring(0, 28)}...`;
    }

    if(!isRead) {
        fontWeight = 'bold';
    }

    return (
        <NextLink href={route}>
            <Container style={{ background }}>

                <Image src={picture} alt='Profile Pic'/>

                <Box>
                    <Header>{title}</Header>
                    
                    <Text style={{ fontWeight }}>   
                        {!photoURL && textSnippet}

                        {photoURL && (
                            <>
                                <FontAwesomeIcon icon={faImage}/>
                                <Span>IMAGE</Span>
                            </>
                        )}
                    </Text>
                </Box>
                
            </Container>
        </NextLink>
    )
}

export default ChatCard;