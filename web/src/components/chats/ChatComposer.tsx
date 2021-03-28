import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchResultsQuery } from '../../generated/graphql';

const Container = styled.div`
    position: relative;
    background: white;
`;

const Input = styled.input`
    height: 100%;
    font-size: 1.4rem;
    border: none;

    &:focus {
        outline: none;
    }
`;

const Block = styled.span`
    margin: 0 10px;
    background: #68bbee;
    padding: 5px;
`;

const Stack = styled.div`
    position: absolute;
    border: 1px solid black;
    left: 10px;
`;

const Card = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    min-width: 300px;
    background: #fff;
    color: black;

    &:hover {
        background: darkblue;
        color: white;
    }
`;

const Span = styled.span`
    font-size: 1.1rem;
    margin-left: 5px;
`;

const Image = styled.img`
    width: 4rem;
    height: 4rem;
`;

const ChatComposer: React.FC<{}> = () => {
    const [query, setQuery] = useState('');
    const [recipients, setRecipients] = useState([]);

    const { data, refetch } = useSearchResultsQuery({
        variables: { query },
        skip: !query
    });

    return (
        <Container>
            {recipients.map(u => 
                <Block>
                    {u.firstName} {u.lastName}
                </Block>
            )}

            <Input 
                type = 'text'
                value = {query}
                onKeyDown = {(e: any) => {
                    if(e.keyCode === 8 && !query.length) {
                        const newRecipients = [...recipients];
                        newRecipients.pop();

                        setRecipients(newRecipients);
                    }
                }}
                onChange = {async (e) => {
                    setQuery(e.target.value);
                    await refetch();
                }}
            />  

            <Stack>
                {data?.searchResults.map(u => 
                    !recipients[u.id]  && (
                        <Card 
                            key={u.id}
                            onClick = {() => {
                                const newRecipients = [...recipients];
                                newRecipients.push(u);

                                setRecipients(newRecipients);
                                setQuery('');
                            }}    
                        >  
                            <Image src={u.profileURL} alt='profile pic'/>

                            <Span>
                                {u.firstName} {u.lastName}
                            </Span>
                        </Card> 
                    )
                )}
            </Stack>
        </Container>
    )
}

export default ChatComposer;