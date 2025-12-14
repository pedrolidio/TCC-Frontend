'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authService } from '../services/authService';
import { AuthState } from '../types';

export async function loginAction(
  prevState: AuthState, 
  formData: FormData
): Promise<AuthState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Por favor, preencha todos os campos.' };
  }

  try {
    const response = await authService.login({ username, password });

    const cookieStore = await cookies();
    
    cookieStore.set('session_token', response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });

  } catch (err: any) {
    return { error: err.message || 'Ocorreu um erro ao tentar fazer login.' };
  }

  redirect('/vehicles');
}