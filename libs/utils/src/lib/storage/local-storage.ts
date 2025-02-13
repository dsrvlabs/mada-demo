export const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window === "undefined") return false;
  window.localStorage.setItem(key, value);
  return true;
};
