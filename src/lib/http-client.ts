import { cookies } from 'next/headers';
import { env } from '@/config/env';
import { HttpError } from '@/errors/HttpError';

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export async function httpClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const finalHeaders = { ...defaultHeaders, ...options.headers };

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${env.api.url}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: finalHeaders,
    cache: options.cache || 'no-store', 
  });

  if (!response.ok) {
    let errorMessage = `Erro HTTP: ${response.status}`;
    
    try {
      const errorBody = await response.json();
      if (errorBody.error) {
        errorMessage = errorBody.error;
      } 
    } catch {
      // Ignora erro de parse
    }

    throw new HttpError(response.status, errorMessage);
  }

  if (response.status === 204) return null as T;
  
  return response.json();
}