export function deepFreeze<T>(obj: T): Readonly<T> {
  function nullishSafeDeepFreeze(value: unknown): void {
    if (value !== null && value !== undefined) {
      deepFreeze(value);
    }
  }

  if (obj instanceof Map) {
    obj.clear =
      obj.delete =
      obj.set =
        () => {
          throw new Error("map is read-only");
        };
    for (const [key, value] of obj.entries()) {
      nullishSafeDeepFreeze(key);
      nullishSafeDeepFreeze(value);
    }
  } else if (obj instanceof Set) {
    obj.add =
      obj.clear =
      obj.delete =
        () => {
          throw new Error("set is read-only");
        };
    for (const value of obj.values()) {
      nullishSafeDeepFreeze(value);
    }
  } else if (obj instanceof WeakSet) {
    obj.add = obj.delete = () => {
      throw new Error("WeakSet is read-only");
    };
  } else if (obj instanceof WeakMap) {
    obj.set = obj.delete = () => {
      throw new Error("WeakMap is read-only");
    };
  }

  // Freeze self
  Object.freeze(obj);

  if (obj !== null && (typeof obj === "object" || typeof obj === "function")) {
    for (const name of Object.getOwnPropertyNames(obj)) {
      const prop = (obj as Record<string, unknown>)[name];
      const type = typeof prop;

      // Freeze prop if it is an object or function and also not already frozen
      if ((type === "object" || type === "function") && prop !== null && !Object.isFrozen(prop)) {
        deepFreeze(prop);
      }
    }
  }

  return obj as Readonly<T>;
}
