// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JSONSerializer = {
    serialize: (v) => JSON.stringify(v),
    deserialize: (s) => {
    try {
        return JSON.parse(s);
    } catch (error) {
        console.warn("JSON deserialize error", error);
        return null;
    }
    },
};

export function keyWithNs(ns, key) {
    return ns ? `${ns}:${key}` : key;
}


export function ftSetItem(key, value,  options) {
    const serializer = options?.serializer ?? JSONSerializer;
    const ns = options?.ns;
    const ttl = options?.ttl || null; 
    const expiresAt = ttl ? Date.now() + ttl : null;
    const payload = { value, expiresAt }; 
    try {
        const raw = serializer.serialize(payload);
        localStorage.setItem(keyWithNs(ns, key), raw);
        window.dispatchEvent(new CustomEvent("fcc:local-storage", { detail: { key, ns }}))
        return true;
    } catch (error) {
        console.warn("ftSetItem error", error);
        window.dispatchEvent(new CustomEvent("fcc:local-storage", { detail: { key, ns, error } }));
        return false;
    }
}

export function ftGetItem(key, options) {
    const serializer = options?.serializer ?? JSONSerializer;
    const ns = options?.ns;
  try {
    const raw = localStorage.getItem(keyWithNs(ns, key));
    if (raw === null) return null;
    const parsed = serializer.deserialize(raw);
    if (!parsed) return null;
    if (parsed.expiresAt && parsed.expiresAt <= Date.now()) {
      localStorage.removeItem(keyWithNs(ns, key));
      return null;
    }
    return parsed.value;    
    } catch (error) {
        console.warn("ftGetItem error", error);
        window.dispatchEvent(new CustomEvent("fcc:local-storage", { detail: { key, ns, error } }));
        return null;
    }
}
export function ftRemoveItem(key, options) {
  const ns = options?.ns;
  try {
    localStorage.removeItem(keyWithNs(ns, key));
    window.dispatchEvent(new CustomEvent("fcc:local-storage", { detail: { key, ns } }));
    return true;
  } catch (e) {
    console.warn("ftRemoveItem error", e);
    return false;
  }
}

export function clearNamespaceLS(ns) {
  if (!ns) {
    localStorage.clear();
    window.dispatchEvent(new CustomEvent("fcc:local-storage:clear"));
    return;
  }
  const prefix = `${ns}:`;
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) toRemove.push(k);
  }
  toRemove.forEach((k) => localStorage.removeItem(k));
  window.dispatchEvent(new CustomEvent("fcc:local-storage:clear", { detail: { ns } }));
}
