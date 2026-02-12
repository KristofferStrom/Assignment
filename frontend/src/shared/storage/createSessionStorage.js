export const createSessionStorage = (keyPrefix) => {
  const prefix = String(keyPrefix ?? "");

  const keyOf = (id) => `${prefix}${String(id)}`;

  const save = (id, value) => {
    if (id === undefined || id === null) return;
    sessionStorage.setItem(keyOf(id), JSON.stringify(value));
  };

  const load = (id) => {
    if (id === undefined || id === null) return null;

    try {
      const raw = sessionStorage.getItem(keyOf(id));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const clear = (id) => {
    if (id === undefined || id === null) return;
    sessionStorage.removeItem(keyOf(id));
  };

  return { save, load, clear };
};
