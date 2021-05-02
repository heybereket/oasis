import { RelationFieldData } from './Relation';
import { entityMapping } from './Entity';

export const getRelations = (type: string) => {
  const allRelations: RelationFieldData[] = entityMapping
    .get(type)
    .entity.fields.filter((f) => f.type === 'relation') as any;

  return new Map(allRelations.map((rel) => [rel.fieldName, rel.entity]));
};
