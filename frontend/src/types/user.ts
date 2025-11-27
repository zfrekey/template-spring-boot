import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cpf: z.string()
    .min(1, 'CPF é obrigatório')
    .refine(
      (val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val) || /^\d{11}$/.test(val),
      'CPF inválido (use 000.000.000-00 ou 11 dígitos)'
    ),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  gender: z.enum(['M', 'F'], { message: 'Selecione um sexo válido' })
});

export type UserData = z.infer<typeof userSchema>;

export type Gender = 'M' | 'F';
