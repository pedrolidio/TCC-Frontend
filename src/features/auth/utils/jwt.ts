interface JWTPayload {
  id: number;
  role_id: number;
  exp: number;
}

export function decodeJWTPayload(token: string): JWTPayload | null {
  try {
    const base64Url = token.split('.')[1];
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar JWT:", error);
    return null;
  }
}