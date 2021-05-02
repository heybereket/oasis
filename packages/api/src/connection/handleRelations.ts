import { firestore } from 'firebase-admin';
import { getRefData as _getRefData } from '../utils/get/getRefData';
import { getRelations } from './getRelations';
import { entityMapping } from './Entity';

const getRefData = async (
  ref: firestore.DocumentReference<firestore.DocumentData>,
  entity: string
) => {
  const data = await _getRefData(ref);
  handleRelations(data, entity);
  return data;
};

export const handleRelations = (data: any, myType: string): any => {
  const myRelations = getRelations(myType);

  for (const [key, value] of Object.entries(data)) {
    const valEntity = myRelations.get(key);
    const valEntityClass = entityMapping.get(valEntity);

    // If a Document Reference, replace the value with a thenable that resolves the data
    if (value instanceof firestore.DocumentReference) {
      data[key] = {
        then: async (cb: any) => {
          return cb(
            valEntityClass.deserialize(
              await getRefData(value, myRelations.get(key))
            )
          );
        },
      };
      continue;
    }

    // If an array of document references, do the same thing as above, but for all of them.
    if (
      Array.isArray(value) &&
      value[0] instanceof firestore.DocumentReference
    ) {
      data[key] = {
        then: async (cb: any) => {
          const data = await Promise.all(
            value.map(async (ref) =>
              valEntityClass.deserialize(await getRefData(ref, valEntity))
            )
          );
          return cb(data);
        },
      };
      continue;
    }
  }
};
