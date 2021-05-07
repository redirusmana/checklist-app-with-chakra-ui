export const CLIENT_NAME = process.env.REACT_APP_NAME;
export const CLIENT_API = process.env.REACT_APP_DEFAULT_BACKEND;
export const CLIENT_ROUTE_BASE = process.env.REACT_APP_DEFAULT_ROUTE_BASE;

export const assetsApiUrl = url => {
  if (!url) {
    return undefined;
  }
  if (url.includes(CLIENT_API)) {
    return url;
  }
  return `${CLIENT_API}/${url}`;
};
