export const entityTransformer = (entity, keys, addArray = {}) => {
  Object.entries(addArray).forEach((item) => {
    entity[item[0]] = item[1];
  });
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !keys.includes(key))
  );
};
