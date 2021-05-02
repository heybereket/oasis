import { firestore } from 'firebase-admin';
import { getRefData as _getRefData } from '../utils/getRefData';

const getRefData: typeof _getRefData = async (ref) => {
  const data = await _getRefData(ref);
  handleRelations(data);
  return data;
};

export const handleRelations = (data: any): any => {
  for (const [key, value] of Object.entries(data)) {
    // If a Document Reference, replace the value with a thenable that resolves the data
    if (value instanceof firestore.DocumentReference) {
      data[key] = {
        then: async (cb: any) => {
          return cb(await getRefData(value));
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
          const data = await Promise.all(value.map(getRefData));
          return cb(data);
        },
      };
      continue;
    }
  }
};
