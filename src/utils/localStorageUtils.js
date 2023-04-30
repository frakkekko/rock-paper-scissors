export function getStorageItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setStorageItem(key, el) {
  console.log(el);
  JSON.stringify(localStorage.setItem(key, el));
}
