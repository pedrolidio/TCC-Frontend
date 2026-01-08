'use server';

import { userService } from '../services/userService';

export type UpdatePasswordState = {
  success?: boolean;
  error?: string;
};

export async function updateUserPasswordAction(
  userId: number,
  prevState: UpdatePasswordState,
  formData: FormData
): Promise<UpdatePasswordState> {
  try {
    const password = formData.get('password') as string;

    if (!userId) {
      return { error: 'Usuário não identificado.' };
    }

    if (!password || password.length < 8) {
      return { error: 'A senha deve ter no mínimo 8 caracteres.' };
    }

    await userService.updatePassword(userId, password);

    return { success: true };

  } catch (error: any) {
    return { error: error.message || 'Erro ao atualizar a senha.' };
  }
}