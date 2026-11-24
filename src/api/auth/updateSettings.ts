import toast from 'react-hot-toast';
import { schemaAuth } from '@/types/auth';
import { FirebaseError } from 'firebase/app';
import {
  updatePassword,
  deleteUser,
  signOut,
  updateProfile,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

export const updateUserName = async (name: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('Você precisa entrar com a sua conta.');
    }
    const isValid = schemaAuth.shape.name.safeParse(name);
    if (!isValid.success) {
      throw new Error('Insira um nome válido');
    }
    await updateProfile(auth.currentUser, { displayName: name });
    toast.success('Suas alterações foram salvas.');
  } catch (err) {
    if (err instanceof FirebaseError) {
      toast.error('Erro ao alterar nome');
      throw err;
    }
    if (err instanceof Error) {
      toast.error(err.message);
      throw err;
    }
    toast.error('Erro em nossos servidores. Tente novamente mais tarde');
    throw err;
  }
};

export const updateUserEmail = async (email: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('Você precisa entrar com a sua conta.');
    }
    const isValid = schemaAuth.shape.email.safeParse(email);
    if (!isValid.success) {
      throw new Error('Insira um endereço de e-mail válido');
    }
    await verifyBeforeUpdateEmail(auth.currentUser, email);
    toast.success(
      'Verifique seu e-mail para confirmar a alteração. Será necessário fazer login novamente.',
      { duration: 5000 }
    );
    await signOut(auth);
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (err.code === 'auth/requires-recent-login') {
        toast.error('Para segurança, faça login novamente para atualizar suas informações.');
        await signOut(auth);
        throw err;
      }
      toast.error('Erro ao atualizar e-mail. Tente novamente.');
      throw err;
    }
    if (err instanceof Error) {
      toast.error(err.message);
      throw err;
    }
    toast.error('Erro em nossos servidores. Tente novamente mais tarde');
    throw err;
  }
};

export const updateUserPassword = async (newPassword: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('Você precisa entrar com a sua conta.');
    }
    const isValid = schemaAuth.shape.password.safeParse(newPassword);
    if (!isValid.success) {
      throw new Error(
        'A senha deve ter no mínimo 6 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.'
      );
    }
    await updatePassword(auth.currentUser, newPassword);
    await signOut(auth);
    toast.success('Senha alterada com sucesso. Faça login novamente.');
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (err.code === 'auth/requires-recent-login') {
        toast.error('Para segurança, faça login novamente para alterar sua senha.');
        await signOut(auth);
        throw err;
      }
      toast.error('Erro ao alterar senha');
      throw err;
    }
    if (err instanceof Error) {
      toast.error(err.message);
      throw err;
    }
    toast.error('Erro em nossos servidores. Tente novamente mais tarde');
    throw err;
  }
};

export const deleteUserAccount = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error('Você precisa entrar com a sua conta.');
    }
    await deleteUser(auth.currentUser);
    toast.success('Conta excluída com sucesso');
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (err.code === 'auth/requires-recent-login') {
        toast.error('Para segurança, faça login novamente para excluir sua conta.');
        await signOut(auth);
        throw err;
      }
      toast.error('Erro ao excluir a conta');
      throw err;
    }
    if (err instanceof Error) {
      toast.error(err.message);
      throw err;
    }
    toast.error('Erro em nossos servidores. Tente novamente mais tarde');
    throw err;
  }
};
