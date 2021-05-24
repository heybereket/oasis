import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import Post from '@entities/Post';
import NewPostInput from './NewPostInput';
import { customAlphabet } from 'nanoid';
import { BCQuery } from '@root/bot-client-gen';

@Resolver()
export class NewPostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  @BCQuery('post', 'boolean')
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
