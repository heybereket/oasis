// import { BaseEntity } from './BaseEntity';
import { entityMapping, RelationFieldData } from './Relation';

export const getRelations = (type: string) => {
  const allRels: RelationFieldData[] = entityMapping
    .get(type)
    .entity.fields.filter((f) => f.type === 'relation') as any;

  return new Map(allRels.map((rel) => [rel.fieldName, rel.entity]));
};
