import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    display: grid;
    grid-template-columns: 5rem auto;
    margin: 0 auto 30px 50px;
`;

const Box = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    color: black;
`;

const Image = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: auto;
`;

const TypingBubble: React.FC<{}> = () => {
    return (
        <Container>
            <Image src='/loading.jpg' alt='profile pic'/>

            <Box>
                <FontAwesomeIcon icon={faEllipsisH} />
            </Box>
        </Container>
    )
}

export default TypingBubble;