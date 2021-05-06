import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ContextType } from '../../apolloServer';
import Post from '../../entities/Post';
import User from '../../entities/User';
import NewPostInput from './NewPostInput';

@Resolver()
export class CurrentUser {
  @Mutation(() => Boolean)
  @Authorized()
  async createPost(
    @Arg('data') data: NewPostInput,
    @Ctx() { getUser }: ContextType
  ) {
    const user = await getUser();
    const newPost = Post.create();
    Post.merge(newPost, data);

    newPost.author = user;
    newPost.save();
    return true;
  }
}
