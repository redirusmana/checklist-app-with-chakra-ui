import api from "./api";

// Action Login & Register
export const apiLogin = "/login";
export const apiRegister = "/register";

export const apiLoginAction = (data, cancelToken) => {
  const url = `${apiLogin}`;
  return api.post(url, data, cancelToken);
};

export const apiSignInAction = (data, cancelToken) => {
  const url = `${apiRegister}`;
  return api.post(url, data, cancelToken);
};

// Action Checklist
export const apiChecklistIndex = "/checklist";

export const apiChecklistGet = (cancelToken, requestOption) => {
  const url = `${apiChecklistIndex}`;
  return api.get(url, cancelToken, requestOption);
};

export const apiChecklistStore = (data, cancelToken, requestOption) => {
  const url = `${apiChecklistIndex}`;
  return api.post(url, data, cancelToken, requestOption);
};

export const apiChecklistDelete = (id, cancelToken, requestOption, data) => {
  const url = `${apiChecklistIndex}/${id}`;
  return api.delete(url, data, cancelToken, requestOption);
};

// Action Item
export const apiItemIndex = "/item";

export const apiItemStore = (data, cancelToken, requestOption) => {
  const url = `${apiItemIndex}`;
  return api.post(url, data, cancelToken, requestOption);
};

export const apiItemShow = (id, cancelToken, requestOption) => {
  const url = `${apiItemIndex}/${id}`;
  return api.get(url, cancelToken, requestOption);
};

export const apiItemPutStatus = (id, cancelToken, requestOption, data) => {
  const url = `${apiItemIndex}/${id}`;
  return api.put(url, data, cancelToken, requestOption);
};

export const apiItemDelete = (id, cancelToken, requestOption, data) => {
  const url = `${apiItemIndex}/${id}`;
  return api.delete(url, data, cancelToken, requestOption);
};

export const apiItemPutRename = (data, id, cancelToken, requestOption) => {
  const url = `${apiItemIndex}/rename/${id}`;
  return api.put(url, data, cancelToken, requestOption);
};
