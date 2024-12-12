import { jwtDecode } from 'jwt-decode';

export const getDecodedToken = (cookie: string) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${cookie}=`))
    ?.split('=')[1];
  
  if (!token) {
    throw new Error('Token d\'authentification non trouvé');
  }

  const decodedToken = jwtDecode(token);
  return decodedToken;
}