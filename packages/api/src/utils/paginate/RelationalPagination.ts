import { AdvancedOptions } from 'type-graphql/dist/decorators/types';
import { BaseEntity } from 'typeorm';

type EntityReturner = () => typeof BaseEntity;

export const mapping = new Map<
  EntityReturner,
  {
    [key: string]: {
      getValEntity: EntityReturner;
      otherSideKey: string;
      options: AdvancedOptions;
    };
  }
>();

export const RelationalPagination =
  (
    getKeyEntity: () => typeof BaseEntity,
    getValEntity: () => typeof BaseEntity,
    otherSideKey: string,
    options: AdvancedOptions = {}
  ): PropertyDecorator =>
  (_, pk) => {
    const propKey = String(pk);

    if (!mapping.has(getKeyEntity)) mapping.set(getKeyEntity, {});

    const allRelations = mapping.get(getKeyEntity);

    allRelations[propKey] = { getValEntity, otherSideKey, options };
  };
