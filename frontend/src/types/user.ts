import { z } from 'zod';

export type Gender = 'MASCULINO' | 'FEMININO';

export const userCreateSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  cpf: z.string()
    .min(1, 'CPF é obrigatório')
    .refine(
      (val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val) || /^\d{11}$/.test(val),
      'CPF inválido (use 000.000.000-00 ou 11 dígitos)'
    ),
  nascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  sexo: z.enum(['MASCULINO', 'FEMININO'], { message: 'Selecione um sexo válido' })
});

export type UserCreate = z.infer<typeof userCreateSchema>;

export const userEditSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  nascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  sexo: z.enum(['MASCULINO', 'FEMININO'], { message: 'Selecione um sexo válido' })
});

export type UserEdit = z.infer<typeof userEditSchema>;

export interface UserResponse extends UserCreate {
  id: number;
}
