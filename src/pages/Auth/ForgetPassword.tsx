import { schemaAuth } from '@/types/auth';
import { variants } from './motion-variants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../components/ui/card';
import { Field, FieldGroup } from '../../components/ui/field';
import { Button } from '../../components/ui/button';
import { resetPassword } from '../../api/auth/resetPassword';
import InputController from '../../components/InputController/InputController';
import type z from 'zod';
import { useState } from 'react';

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailSchema = schemaAuth.pick({ email: true });
  type Email = z.infer<typeof emailSchema>;

  const form = useForm<Email>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: Email) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      navigate(-1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="tw:w-full tw:min-h-screen tw:flex tw:items-center tw:justify-center tw:overflow-hidden">
      <Card size="default" variants={variants} initial="right" animate="visible">
        <CardHeader>
          <CardTitle>Redefinir senha</CardTitle>
          <CardDescription>
            Insira o seu e-mail para receber uma mensagem com as informações para redefinir a sua
            senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="sign-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="tw:flex tw:flex-col tw:gap-4"
          >
            <FieldGroup>
              <InputController
                name="email"
                control={form.control}
                label="Insira o seu e-mail"
                inputId="email"
                type="email"
                autoComplete="email"
                placeholder="exemplo@exemplo.com"
              />
            </FieldGroup>
            <CardFooter>
              <Field orientation="horizontal" className="tw:w-full tw:justify-center ">
                <Button
                  size="default"
                  type="submit"
                  disabled={isLoading}
                  aria-label="Enviar e-mail para restaurar senha"
                >
                  Enviar e-mail
                </Button>
              </Field>
              <Button
                className="tw:text-blue-600 tw:hover:bg-none!"
                type="button"
                variant="ghost"
                role="navigation"
                onClick={() => navigate(-1)}
              >
                Voltar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgetPassword;
