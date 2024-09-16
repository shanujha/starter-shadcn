export function getNestedValue(obj, key) {
  // Split the key into an array of properties
  const keys = key.split(".");
  // Reduce the keys array to traverse the object
  return keys.reduce(
    (acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined),
    obj
  );
}
