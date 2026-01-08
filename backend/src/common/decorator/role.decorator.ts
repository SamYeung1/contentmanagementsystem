export const META_KEY = 'role';
export const Role = (resourceName: string) => {
  return function(target: Object, key?: string | symbol) {
    // Store metadata on the target
    Reflect.defineMetadata(META_KEY, resourceName, target, key);
  };
};