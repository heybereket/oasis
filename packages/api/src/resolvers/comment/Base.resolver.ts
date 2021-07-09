import Comment from '@entities/Comment';
import { createResolver } from '@utils/files/createResolver';

// @bcg-resolver(query, paginateComments, comment)
// @bcg-resolver(query, getComment, comment)

export default createResolver('Comment', Comment);
