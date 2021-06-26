/* eslint-disable require-atomic-updates */
import { getDatabase } from '@config/database';
import Post from '@entities/Post';

(async () => {
  await getDatabase();
  const posts = await Post.find();
  posts.forEach(async (post) => {
    post.upvotes = (await post.upvoters).length;
    post.downvotes = (await post.downvoters).length;
    post.save();
  });
})();
