import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import Post from '@entities/Post';
import NewPostInput from './NewPostInput';

@Resolver()
export class NewPostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async createPost(
    @Arg('data') data: NewPostInput,
    @Ctx() { getUser }: ContextType
  ) {
    const newPost = Post.create();
    Post.merge(newPost, data);

    // Even though getUser returns a Promise<User> it does not work with lazy loading for some reason.
    // For lazy loading relationships you need to call Promsie.resolve with the entity for the relationship
    // for example
    //  newPost.author = getUser(); does not work
    // while
    //  newPost.author = Promise.resolve(await getUser()); does work

    newPost.createdAt = String(Date.now());

    newPost.author = Promise.resolve(await getUser());
    newPost.createdAt = String(Date.now());
    newPost.save();
    return true;
  }
}
