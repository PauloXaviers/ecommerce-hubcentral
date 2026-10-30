import { schemaAuth } from '@/types/auth';
import { signIn, signWithGoogle } from '../../api/auth/signIn';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { useState } from 'react';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signInSchema = schemaAuth.pick({
    email: true,
    password: true,
  });

  type SignForm = z.infer<typeof signInSchema>;
  const form = useForm<SignForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignForm) => {
    setIsLoading(true);
    try {
      const user = await signIn(data);
      if (user) {
        navigate(-1);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignWithGoogle = async () => {
    try {
      const user = await signWithGoogle();
      if (user) {
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao cadastrar com Google:', error);
    }
  };
  return {
    handleSignWithGoogle,
    onSubmit,
    form,
    isLoading,
    navigate
  };
};
