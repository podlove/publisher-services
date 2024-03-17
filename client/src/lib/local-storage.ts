export const save = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const get = <T>(key: string): T | null => {
  const content = localStorage.getItem(key);

  if (typeof content !== 'string') {
    return null;
  }

  return JSON.parse(content);
};
