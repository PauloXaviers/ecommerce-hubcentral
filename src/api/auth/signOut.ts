import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';

export const signOutUser = async () => {
  try {
    await signOut(auth);
    toast.success('Sucesso ao sair da conta');
  } catch (err) {
    if (err instanceof FirebaseError) {
      toast.error('Erro em sair da sua conta, tente novamente');
      console.error(err);
      throw err;
    }
    if (err instanceof Error) {
      toast.error('Erro em nossos servidores. Por favor tente novamente mais tarde');
      console.error(err);
      throw err;
    }
  }
};
