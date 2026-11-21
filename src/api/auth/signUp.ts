import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile, type User } from 'firebase/auth';
import { schemaAuth, type Auth } from '../../types/auth';
import toast from 'react-hot-toast';
import { auth } from '../../config/firebase';

export const createUser = async (data: Auth): Promise<User | null> => {
  try {
    const validadeEmail = schemaAuth.shape.email.safeParse(data.email);
    const validadePassword = schemaAuth.shape.password.safeParse(data.password);
    if (!validadeEmail.success || !validadePassword.success) {
      throw new Error('Os dados preenchidos não estão de conforme solicitado');
    }
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    toast.success('Usuário criado com sucesso');
    await updateProfile(user.user, { displayName: data.name });
    return user.user;
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Já existe uma conta com esse endereço de e-mail');
        console.error(err.message);
        throw err;
      }
      toast.error('Não foi possível criar usuário');
      console.error(err.message);
      throw err;
    }
    if (err instanceof Error) {
      toast.error('Erro ao criar usuário');
      console.error(err.message);
      throw err;
    }
    toast.error('Erro em nossos servidores, por favor tente novamente mais tarde');
    console.error(err);
    throw err;
  }
};
