import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faComment ,
    faHeart, 
    faUserPlus 
} from '@fortawesome/free-solid-svg-icons';

const Icon = styled.div`
    margin-top: 10px;
`;

interface IconProps {
    type: string;
}

const Index: React.FC<IconProps> = ({ type }) => {
    let color: string;

    switch(type) {
        case 'like':
            color = 'red';
            break;
        case 'friend':
            color = 'lightblue';
            break;
        default:
            color = '#09ad09';
    }

    return (
        <Icon style={{ color }}>
            {type === 'like' && <FontAwesomeIcon icon={faHeart} />}
            {type === 'comment' && <FontAwesomeIcon icon = {faComment} />}
            {type === 'friend' && <FontAwesomeIcon icon = {faUserPlus} />}
        </Icon>
    )
}   

export default Index;