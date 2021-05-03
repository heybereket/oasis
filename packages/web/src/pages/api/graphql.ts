import { createAPIHandler } from '@oasis/api';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createAPIHandler();
