export const setTokens = (access, refresh, remember) => {
  console.log("setTokens called with:", {
    access: access?.substring(0, 20),
    refresh: refresh?.substring(0, 20),
    remember,
  });
  const primary = remember ? localStorage : sessionStorage;
  const secondary = remember ? sessionStorage : localStorage;

  primary.setItem("access_token", access);
  primary.setItem("refresh_token", refresh);
  console.log("Tokens saved to:", remember ? "localStorage" : "sessionStorage");

  // Remove stale tokens from the other storage to avoid reading old values
  secondary.removeItem("access_token");
  secondary.removeItem("refresh_token");
};

export const getAccessToken = () => {
  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");
  console.log(
    "getAccessToken called, found:",
    token ? `${token.substring(0, 20)}...` : "NO TOKEN"
  );
  console.log(
    "localStorage has:",
    localStorage.getItem("access_token") ? "YES" : "NO"
  );
  console.log(
    "sessionStorage has:",
    sessionStorage.getItem("access_token") ? "YES" : "NO"
  );
  return token;
};

export const clearTokens = () => {
  localStorage.clear();
  sessionStorage.clear();
};
