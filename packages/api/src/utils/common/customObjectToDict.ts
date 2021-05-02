export const customObjectToDict = (obj: any): { [key: string]: any } => {
  let ret = {};
  Object.keys(obj).forEach((keyVal) => {
    ret[keyVal] = obj[keyVal];
  });
  return ret;
};
