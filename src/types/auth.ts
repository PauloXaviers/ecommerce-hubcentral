import z from 'zod';

export const schemaAuth = z.object({
  name: z.string('Insira o seu nome').min(1, 'Insira pelo menos um caracter'),
  email: z.email('E-mail inválido'),
  password: z
    .string('Insira uma senha')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
      'A senha deve ter no mínimo 6 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.'
    ),
});

export type Auth = z.infer<typeof schemaAuth>;
