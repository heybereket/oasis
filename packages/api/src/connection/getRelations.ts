import { RelationFieldData } from './Relation';
import { entityMapping } from './Entity';

/**
 * @param entityName The name of the entity
 * @returns
 *   Returns every relational field in the form of a map
 *   The map maps each relation field name to the name of the entity that the value's type is
 *   For example, a "comments" field name (on Post) mapped to the "Comment" entity,
 *   or the "post" field name (on Comment) mapped to the "Post" entity
 */
export const getRelations = (entityName: string) => {
  const allRelations: RelationFieldData[] = entityMapping
    .get(entityName)
    .entity.fields.filter((f) => f.type === 'relation') as any;

  return new Map(allRelations.map((rel) => [rel.fieldName, rel.entity]));
};
