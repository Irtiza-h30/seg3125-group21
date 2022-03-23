export const setItem = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

export const getItem = (key) => {
  let value = null;
  try {
    value = JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return null;
  }

  return value;
};

export const generateId = () => Math.random().toString(16).slice(2);
