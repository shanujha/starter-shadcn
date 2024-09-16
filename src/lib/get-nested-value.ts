export function getNestedValue(obj: any, key: any) {
  // Split the key into an array of properties
  const keys = key.split(".");
  // Reduce the keys array to traverse the object
  return keys.reduce(
    (acc: any, k: any) => (acc && acc[k] !== undefined ? acc[k] : undefined),
    obj
  );
}
