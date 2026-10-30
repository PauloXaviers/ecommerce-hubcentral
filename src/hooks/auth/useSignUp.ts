import { type Auth } from '@/types/auth';
import { createUser } from '@/api/auth/signUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaAuth } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const form = useForm<Auth>({
    resolver: zodResolver(schemaAuth),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '' },
  });


  const onSubmit = async (data: Auth) => {
    setIsLoading(true);
    try {
      const user = await createUser(data);
      if (user) {
        navigate('/')
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return {
    onSubmit,
    navigate,
    isLoading,
    form,
  };
};
