import React from 'react';
import { withApollo } from '../../utils/withApollo';
import Layout from '../../components/Layout';

const Profile : React.FC<{}> = () => {
    return (
        <Layout>
            
        </Layout>
    )
}


export default withApollo({ ssr: true })(Profile);