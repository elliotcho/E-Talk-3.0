import React from 'react';
import styled from 'styled-components';
import { 
    MeDocument, 
    MeQuery, 
    useMeQuery, 
    useRemoveProfilePicMutation, 
    useUpdateProfilePicMutation 
} from '../../generated/graphql';

const Header = styled.h2`
    text-align: center;
`;

const Box = styled.div`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin: 30px auto;
    padding: 0;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
`;

const Update = styled.label`
    display: none;
    text-align: center;
    position: absolute;
    top: 80px;
    left: 6.3rem;
    border-bottom-left-radius: 75px;
    border-bottom-right-radius: 75px;
    background: lightgray;
    opacity: 0.7;
    width: 6rem;
    height: 3rem;
    cursor: pointer;
    ${Box}:hover & {
        display: block;
    }
`;

const Input = styled.input`
    display: none;
`;

const Remove = styled.button`
    position: absolute;
    background: #d9d9d9;
    cursor: pointer;
    top: 25px;
    right: 6rem;
    border-radius: 50%;
    font-size: 1.4rem;
    font-weight: bold;
    border: none;
    outline: none;
`;

const ProfileCard: React.FC<{}> = () => {
    const { data } = useMeQuery();
    const [removePic] = useRemoveProfilePicMutation();
    const [uploadPic] = useUpdateProfilePicMutation();

    let firstName = data?.me.firstName || 'Loading...';
    let lastName = data?.me.lastName || 'User...';
    let profilePic = data?.me?.profilePic;
    let imgURL = data?.me?.profileURL;
 
    return (
        <>
            <Box>
                {imgURL && (
                    <Image src={imgURL} alt='Profile pic'/>
                )}   

                <Update htmlFor='profilePic'>
                    Update
                </Update>
            </Box>

            <Input
                type = 'file'
                id = 'profilePic'
                onChange = {async (e) => {
                    const file = e.target.files[0];

                    await uploadPic({ 
                        variables: { file },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: 'Query',
                                    me: data?.updateProfilePic.user
                                }
                            });
                        }
                    });
                }}
            />

            <Header>{firstName} {lastName}</Header>

            {profilePic && (
                <Remove 
                    onClick={async () => {
                            await removePic({
                                update: (cache, { data }) => {
                                    cache.writeQuery<MeQuery>({
                                        query: MeDocument,
                                        data: {
                                            __typename: 'Query',
                                            me: data?.removeProfilePic.user
                                        }
                                    })
                                }
                            });
                        }}
                    >
                        X
                </Remove>
            )}
        </>
    )
}

export default ProfileCard;