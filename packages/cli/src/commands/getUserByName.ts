import * as log from '../utils/output/log';
import Client from '../sdkClient';
import { BaseArguments } from '../types/arguments';

interface GetUserByNameArguments extends BaseArguments {
  username: string;
  json: boolean;
}

export const command = 'get_user_by_name <username> [json]';
export const desc =
  'Queries posts submitted by <username>. <username> must be a valid user. May return null if user is not found';

export const builder = {
  username: {
    default: undefined,
    describe: "the specified user's name",
  },
  json: {
    type: 'boolean',
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};

export const handler = async (yargs: GetUserByNameArguments) => {
  const data = await Client({ token: '', server: yargs.server })
    .createQueryBuilder('getUserByName')
    .addFields({
      id: true,
      banner: true,
      avatar: true,
      createdAt: true,
      github: true,
      twitter: true,
      discord: true,
      bio: true,
      username: true,
      name: true,
      verified: true,
      badges: {
        name: true,
        id: true,
        imagePath: true,
        level: true,
        description: true,
      },
      ARGS: { username: yargs.username },
    })
    .send();

  if (yargs.json) return console.log(JSON.stringify(data));
  log.info(data);
};
