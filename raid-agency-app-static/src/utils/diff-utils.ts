import pkg, { type Operation } from "fast-json-patch";
const { compare } = pkg;

// Define types for your key mapper function
type KeyMapperFn = (index: number, item: any, parent: any) => string;

/**
 * Creates JSON Patch operations with custom keys instead of numeric indices
 */
export function createCustomKeyDiff<T extends object | any[]>(
  obj1: T,
  obj2: T,
  keyMapper: KeyMapperFn
): Operation[] {
  // Generate standard JSON Patch operations
  const operations = compare(obj1, obj2);

  // Transform the paths to use custom keys
  return operations.map((op) => {
    let path = transformPath(op.path, op.op, obj1, obj2, keyMapper);
    if (path.startsWith("/")) {
      path = path.substring(1);
    }
    return {
      ...op,
      path,
    };
  });
}

/**
 * Transforms a standard path to use custom keys
 */
function transformPath(
  path: string,
  operation: string,
  originalObj: any,
  newObj: any,
  keyMapper: KeyMapperFn
): string {
  const pathParts = path.split("/").filter(Boolean);
  let result = "";
  let currentOrigObj = originalObj;
  let currentNewObj = newObj;

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    const numericIndex = parseInt(part as string, 10);

    if (!isNaN(numericIndex) && Array.isArray(currentOrigObj)) {
      // This part is a numeric index, replace with custom key
      const item =
        operation === "add"
          ? currentNewObj[numericIndex]
          : currentOrigObj[numericIndex];
      const parent = operation === "add" ? currentNewObj : currentOrigObj;
      const customKey = keyMapper(numericIndex, item, parent);
      result += `/${customKey}`;

      // Update current objects for next iteration
      currentOrigObj = currentOrigObj?.[numericIndex];
      currentNewObj = currentNewObj?.[numericIndex];
    } else {
      // Keep the original part
      result += `/${part}`;
      currentOrigObj = part !== undefined ? currentOrigObj?.[part] : undefined;
      currentNewObj = part !== undefined ? currentNewObj?.[part] : undefined;
    }
  }

  return result || "/";
}
