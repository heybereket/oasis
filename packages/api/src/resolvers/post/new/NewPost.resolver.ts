import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import Post from '@entities/Post';
import NewPostInput from './NewPostInput';
import { customAlphabet } from 'nanoid';

// @bcg-resolver(mutation, createPost, post)

@Resolver()
export class NewPostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async createPost(
    @Arg('data') data: NewPostInput,
    @Ctx() { getUser }: ContextType
  ) {
    const newPost = Post.create();
    const nanoid = customAlphabet('1234567890abcdef', 10);
    Post.merge(newPost, data);

    newPost.createdAt = String(Date.now());

    newPost.author = Promise.resolve(await getUser());
    newPost.createdAt = String(Date.now());
    newPost.id = nanoid();

    newPost.save();
    return true;
  }
}
