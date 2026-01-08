'use server';

import { revalidatePath } from 'next/cache';
import { userService } from '../services/userService';

export type UpdateRoleState = {
  success?: boolean;
  error?: string;
};

export async function updateUserRoleAction(
  userId: number,
  prevState: UpdateRoleState,
  formData: FormData
): Promise<UpdateRoleState> {
  try {
    const roleId = Number(formData.get('role_id'));

    if (!userId || !roleId) {
      return { error: 'Dados inválidos para atualização.' };
    }

    await userService.updateRole(userId, roleId);

    revalidatePath('/users');
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Erro ao atualizar permissão.' };
  }
}