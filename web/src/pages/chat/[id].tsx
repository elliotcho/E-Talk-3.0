import React from 'react';
import { withApollo } from '../../utils/withApollo';
import MessagesPage from '../chat';

const Chats: React.FC<{}> = () => {
    return (
        <MessagesPage />
    )
}

export default withApollo({ ssr: false })(Chats);