export const getSavedToken = () => {
  return window.localStorage.getItem("saved_token");
};

export const saveToken = token => {
  console.log(token);
  window.localStorage.setItem("saved_token", token);
};

export const removeToken = () => {
  window.localStorage.removeItem("saved_token");
};
