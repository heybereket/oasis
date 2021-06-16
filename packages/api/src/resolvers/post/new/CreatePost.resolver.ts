import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Post from '@entities/Post';
import { customAlphabet } from 'nanoid';
import CreatePostInput from './CreatePostInput';

// @bcg-resolver(mutation, createPost, post)

@Resolver()
export class CreatePostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async createPost(
    @Arg('data') data: CreatePostInput,
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
