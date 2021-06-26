import User from '@entities/User';
import { ApolloError } from 'apollo-server-express';
import { BaseEntity } from 'typeorm';

export const upvoteDownvote = async <
  Entity extends BaseEntity & {
    id: string;
    upvotes?: number;
    upvoters: Promise<User[]>;
    downvotes?: number;
    downvoters: Promise<User[]>;
  }
>(
  root: Entity,
  user: User,
  upvote: boolean,
  downvote: boolean,
  getUpvoted: (user: User) => Promise<Entity[]>,
  getDownvoted: (user: User) => Promise<Entity[]>,
  setUpvoted: (user: User, entities: Entity[]) => void,
  setDownvoted: (user: User, entities: Entity[]) => void
) => {
  if (!root) throw new ApolloError('Post not found');

  if ((upvote && downvote) || (!upvote && !downvote)) {
    throw new ApolloError('Please select upvote or downvote');
  }

  const upvotedEntities = await getUpvoted(user);
  let alreadyupvoted = false;
  const upvotedEntitiesMinusNew: Entity[] = [];
  upvotedEntities.forEach((entity) => {
    if (entity.id === root.id) {
      alreadyupvoted = true;
    } else {
      upvotedEntitiesMinusNew.push(entity);
    }
  });

  const downvotedEntities = await getDownvoted(user);
  let alreadydownvoted = false;
  const downvotedEntitiesMinusNew: Entity[] = [];
  downvotedEntities.forEach((entity) => {
    if (entity.id === root.id) {
      alreadydownvoted = true;
    } else {
      downvotedEntitiesMinusNew.push(entity);
    }
  });
  if (upvote) {
    if (!alreadyupvoted) {
      if (alreadydownvoted) {
        setDownvoted(user, downvotedEntitiesMinusNew);
      }
      setUpvoted(user, [...upvotedEntities, root]);
    } else {
      setUpvoted(user, upvotedEntitiesMinusNew);
    }
  } else if (downvote) {
    if (!alreadydownvoted) {
      if (alreadyupvoted) {
        setUpvoted(user, upvotedEntitiesMinusNew);
      }
      setDownvoted(user, [...downvotedEntities, root]);
    } else {
      setDownvoted(user, downvotedEntitiesMinusNew);
    }
  }

  await user.save();
  const newRoot = await root.save();

  newRoot.upvotes = (await newRoot.upvoters).length;
  newRoot.downvotes = (await newRoot.downvoters).length;

  newRoot.save();

  return true;
};
