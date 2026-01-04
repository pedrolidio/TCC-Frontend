'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { driverService } from '../services/driverService';
import { CreateDriverPayload, DriverLicenseCategory } from '../types';

export async function createDriverAction(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const license = formData.get('license') as string;
    const category = formData.get('category') as DriverLicenseCategory;

    if (!name || !license || !category) {
      return { error: 'Todos os campos são obrigatórios.' };
    }

    if (license.length < 11) {
      return { error: 'A CNH deve conter 11 dígitos.' };
    }

    const payload: CreateDriverPayload = {
      name,
      license,
      category
    };

    await driverService.create(payload);

  } catch (error: any) {
    return { error: error.message || 'Erro ao cadastrar condutor.' };
  }

  revalidatePath('/drivers');
  
  redirect('/drivers');
}