const isObjectEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

const isEmptyObject = (obj: object) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export { isObjectEmpty, isEmptyObject };
