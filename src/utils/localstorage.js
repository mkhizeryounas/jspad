const PREFIX = 'PG_CODESHARE';

const genKey = (key) => `${PREFIX}_${key}`;

export const setName = (name) => {
  window.localStorage.setItem(genKey('name'), name);
};

export const getName = () => {
  return window.localStorage.getItem(genKey('name')) || '';
};
