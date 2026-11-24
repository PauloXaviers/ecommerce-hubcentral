import z from 'zod';

const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

export const schemaAuth = z.object({
  name: z.string('Insira o seu nome').min(1, 'Insira pelo menos um caracter'),
  email: z.email('E-mail inválido'),
  password: z
    .string('Insira uma senha')
    .regex(
      passwordRegex,
      'A senha deve ter no mínimo 6 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.'
    ),
});

export const schemaAuthWithResetPassword = schemaAuth
  .extend({
    confirmPassword: z
      .string()
      .regex(
        passwordRegex,
        'A senha deve ter no mínimo 6 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.'
      ),
  })
  .refine((auth) => auth.password === auth.confirmPassword, {
    error: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type AuthWithResetPassword = z.infer<typeof schemaAuthWithResetPassword>;

export type Auth = z.infer<typeof schemaAuth>;
