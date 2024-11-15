import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    const currTime = Math.floor(Date.now() / 1000);
    return currTime > exp;
  } catch (err) {
    console.error("Error decoding token: ", err);
    return true;
  }
};
