import { apolloServer } from '@oasis/api';

export default apolloServer.createHandler({ path: '/api/graphql' });
