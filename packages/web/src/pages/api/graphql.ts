import { createApolloServer } from '@oasis/api';
import { NextApiHandler } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

let realHandler: NextApiHandler;

const handlerWrapper: NextApiHandler = async (req, res) => {
  if (!realHandler) {
    realHandler = (await createApolloServer()).createHandler({
      path: '/api/graphql',
    });
  }

  return realHandler(req, res);
};

export default handlerWrapper;
