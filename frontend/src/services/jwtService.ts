import jwtDecode from 'jwt-decode';

export interface DecodedJWT {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}
export function isTokenExpired(token) {
  const decoded: DecodedJWT = jwtDecode(token);
  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}
