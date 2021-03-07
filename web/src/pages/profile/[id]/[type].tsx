import React from 'react';
import { withApollo } from '../../../utils/withApollo';
import ProfilePage from '../[id]';

const Profile : React.FC<{}> = () => {
    return (
        <ProfilePage />
    )
}

export default withApollo({ ssr: false })(Profile);