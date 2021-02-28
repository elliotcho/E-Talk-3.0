import React from 'react';
import styled from 'styled-components';
import { usePostQuery } from '../../generated/graphql';
import { mapPostProps } from '../../utils/mapPostProps';
import { withApollo } from '../../utils/withApollo';
import Post from '../../containers/posts/Post';
import Layout from '../../components/shared/Layout';
import { useRouter } from 'next/router';

const Header = styled.h2`
   text-align: center;
   color: white;
`;

const PostDetails : React.FC<{}> = () => {
    const router = useRouter();
    const { id } = router.query;

    const postId = (typeof id === 'string') ? parseInt(id) : -1;

    const { data, loading } = usePostQuery({
        variables: { postId }
    });

    if(!loading && !data) {
        router.back();
    }

    return (
        <Layout>
            {loading && (
                <Header>
                    Loading...
                </Header>
            )}

            {data?.post && (
                <Post {...mapPostProps(data.post)} seeMore={true}/>
            )}
        </Layout>
    )
}

export default withApollo({ ssr: true })(PostDetails);