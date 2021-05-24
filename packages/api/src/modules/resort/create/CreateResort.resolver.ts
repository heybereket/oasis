import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import CreateResortInput from './CreateResortInput';
import Resort from '@entities/Resort';

@Resolver()
export class CreateResortResolver {
  @Mutation(() => Boolean)
  @Authorized()
  @BCQuery('resort', 'boolean')
  async createResort(
    @Arg('data') data: CreateResortInput,
    @Ctx() { getUser }: ContextType
  ) {
    const newResort = Resort.create();
    Resort.merge(newResort, data);

    newResort.createdAt = String(Date.now());

    newResort.owner = Promise.resolve(await getUser());
    newResort.save();
    return true;
  }
}
