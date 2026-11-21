import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { schemaAuth } from '@/types/auth';
import { type Auth } from '../../types/auth';
import toast from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

export const resetPassword = async (email: Auth['email']) => {
  try {
    const validateEmail = schemaAuth.shape.email.safeParse(email);
    if (!validateEmail) {
      throw new Error('O e-mal inserido não está válido');
    }
    await sendPasswordResetEmail(auth, email);
    toast.success(
      'Verifique seu e-mail e caixa de spam. Enviamos uma mensagem para recuperar sua senha'
    );
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (err.code === 'auth/user-not-found') {
        toast.error('Não existe uma conta para esse endereço de e-mail');
      }
      toast.error('Não foi possível enviar o e-mail');
      console.error(err.message);
      throw err;
    }
    if (err instanceof Error) {
      toast.error(err.message);
      console.error(err.message);
      throw err;
    }
    toast.error('Erro em nossos servidores, por favor tente novamente mais tarde');
    console.error(err);
    throw err;
  }
};
