import { jwtDecode } from 'jwt-decode';

export const getDecodedToken = (cookie: string) => {

  if (!document.cookie) {
    throw new Error('Aucun cookie trouvé');
  }

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