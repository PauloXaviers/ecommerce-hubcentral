import { auth, googleProvier } from '../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup, type User } from 'firebase/auth';
import { schemaAuth, type Auth } from '../../types/auth';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';

export const signWithGoogle = async (): Promise<User | null> => {
  try {
    const response = await signInWithPopup(auth, googleProvier);
    toast.success('Usuário conectado com sucesso');
    return response.user;
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error('Erro:', err.message);
      toast.error('Erro ao fazer login');
      throw err;
    }
    if (err instanceof Error) {
      toast.error('Erro ao conectar usuário');
      console.error('Erro:', err.message);
      throw err;
    }
    console.error(err);
    toast.error('Erro em nossos servidores, por favor tente novamente mais tarde');
    throw err;
  }
};

export const signIn = async (data: Pick<Auth, 'email' | 'password'>): Promise<User | null> => {
  try {
    const validadeEmail = schemaAuth.shape.email.safeParse(data.email);
    const validadePassword = schemaAuth.shape.password.safeParse(data.password);
    if (!validadeEmail.success || !validadePassword.success) {
      toast.error('Os dados preenchidos não estão corretos');
      throw new Error('Os dados preenchidos não estão de conforme solicitado');
    }
    const res = await signInWithEmailAndPassword(auth, data.email, data.password);
    toast.success('Usuário conectado com sucesso');
    return res.user;
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error('Erro:', err.message);
      toast.error('Erro ao conectar usuário. E-mail ou senha estão incorretos');
      throw err;
    }
    if (err instanceof Error) {
      console.error('Erro:', err.message);
      toast.error(err.message);
      throw err;
    }
    console.error('Erro:', err);
    toast.error('Erro em nossos servidores, por favor tente novamente mais tarde');
    throw err;
  }
};
