import Post from '@entities/Post';
import { createResolver } from '@utils/files/createResolver';

// @bcg-resolver(query, paginatePosts, post)
// @bcg-resolver(query, getPost, post)

export default createResolver('Post', Post);
