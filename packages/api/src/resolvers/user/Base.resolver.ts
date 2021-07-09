import User from '@entities/User';
import { createResolver } from '@utils/files/createResolver';

// @bcg-resolver(query, paginateUsers, user)
// @bcg-resolver(query, getUser, user)

export default createResolver('User', User);
