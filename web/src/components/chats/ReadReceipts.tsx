import React from 'react';
import styled from 'styled-components';
import { useReadReceiptsQuery } from '../../generated/graphql';

const Ul = styled.ul`
    margin: 5px 0 0 0;
    display: flex;
`;

const Li = styled.li`
    font-weight: bold;
    list-style-type: none;
    margin-right: 5px;
`;

const Image = styled.img`
    border-radius: 50%;
    height: 1.2rem;
    width: 1.2rem;
`;

interface ReadReceiptsProps {
    messageId: number;
}

const ReadReceipts: React.FC<ReadReceiptsProps> = ({ messageId }) => {
    const { data } = useReadReceiptsQuery({ variables: { messageId } });
    const readReceipts = data?.readReceipts || [];

    return (
        <>
            {!!readReceipts.length && (
                <Ul>
                    {readReceipts.map(u => 
                        <Li key={u.id}>
                            <Image src={u.profileURL} alt='receipt'/>
                        </Li>    
                    )}
                </Ul>
            )}
        </>
    )
}

export default ReadReceipts;