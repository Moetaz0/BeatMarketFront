export const setTokens = (access, refresh, remember) => {
  const storage = remember ? localStorage : sessionStorage;

  storage.setItem("access_token", access);
  storage.setItem("refresh_token", refresh);
};

export const getAccessToken = () => {
  return (
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );
};

export const clearTokens = () => {
  localStorage.clear();
  sessionStorage.clear();
};
