import React from 'react';
import { withApollo } from '../utils/withApollo';
import Layout from '../components/Layout';

const Index : React.FC<{}> = () => {
   return (
      <Layout>

      </Layout>
   )
}

export default withApollo({ ssr: false })(Index);