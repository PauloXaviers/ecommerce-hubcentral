import { type AuthWithResetPassword, schemaAuthWithResetPassword } from '@/types/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/auth/useAuth';
import {
  deleteUserAccount,
  updateUserPassword,
  updateUserEmail,
  updateUserName,
} from '@/api/auth/updateSettings';

export type UpdateInfos = Pick<AuthWithResetPassword, 'name' | 'email' | 'password'>;

export const useSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputEdit, setInputEdit] = useState<keyof UpdateInfos | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuth((state) => state.user);

  const form = useForm<AuthWithResetPassword>({
    resolver: zodResolver(schemaAuthWithResetPassword),
    values: {
      name: user?.displayName ?? '',
      email: user?.email ?? '',
      password: '******',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!user) return;
    if (inputEdit) {
      form.setValue(inputEdit, '');
    } else {
      form.setValues({ name: user.displayName ?? '', email: user.email ?? '', password: '******' });
    }
  }, [inputEdit, form, user]);

  const updateInfos = {
    name: async (name: string) => await updateUserName(name),
    email: async (email: string) => await updateUserEmail(email),
    password: async (newPassword: string) => await updateUserPassword(newPassword),
  };

  const handleUpdateSetting = async (field: keyof UpdateInfos) => {
    setIsLoading(true);
    try {
      const isValid =
        field === 'password'
          ? (await form.trigger(field)) && (await form.trigger('confirmPassword'))
          : await form.trigger(field);

      if (!isValid) {
        return;
      }
      const newValue = form.getValues(field);
      await updateInfos[field](newValue);
      setInputEdit(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteUserAccount();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return {
    isLoading,
    user,
    inputEdit,
    form,
    isModalOpen,
    handleUpdateSetting,
    handleDeleteAccount,
    setInputEdit,
    toggleModal,
  };
};
