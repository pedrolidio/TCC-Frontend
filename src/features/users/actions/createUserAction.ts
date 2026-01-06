'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { userService } from '../services/userService';
import { CreateUserPayload } from '../types';

export async function createUserAction(prevState: any, formData: FormData) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      return { error: 'Todos os campos são obrigatórios.' };
    }

    if (username.length < 4) {
      return { error: 'O nome de usuário deve ter no mínimo 4 caracteres.' };
    }

    if (password.length < 8) {
      return { error: 'A senha deve ter no mínimo 8 caracteres.' };
    }

    const payload: CreateUserPayload = {
      username,
      password
    };

    await userService.create(payload);

  } catch (error: any) {
    return { error: error.message || 'Erro ao criar usuário.' };
  }

  revalidatePath('/users');

  redirect('/users');
}