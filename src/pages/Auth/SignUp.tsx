import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/card';
import { Field, FieldGroup } from '../../components/ui/field';
import { Button } from '../../components/ui/button';
import InputController from '@/components/InputController/InputController';
import { GoogleLogoIcon } from '@phosphor-icons/react';
import { variants } from './motion-variants';
import { useSignUp } from '@/hooks/auth/useSignUp';
import { useSignIn } from '@/hooks/auth/useSignIn';
const SignUp = () => {
  const { onSubmit, navigate, form, isLoading } = useSignUp();
  const { handleSignWithGoogle } = useSignIn();

  return (
    <section className="tw:w-full tw:min-h-screen tw:flex tw:items-center tw:justify-center">
      <Card size="default" variants={variants} initial="left" animate="visible">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>
            Você pode criar a sua conta com seu e-mail e senha ou criar com o Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="signup-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="tw:flex tw:flex-col tw:gap-10"
          >
            <FieldGroup>
              <InputController
                name="name"
                control={form.control}
                label="Insira o seu nome"
                inputId="name"
                type="name"
                autoComplete="name"
                placeholder="Nome"
              />
              <InputController
                name="email"
                control={form.control}
                label="Insira o seu e-mail"
                inputId="email"
                type="email"
                autoComplete="email"
                placeholder="exemplo@exemplo.com"
              />
              <InputController
                name="password"
                control={form.control}
                label="Insira a sua senha"
                inputId="password"
                type="password"
                autoComplete="new-password"
                placeholder="*********"
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal" className="tw:w-full tw:justify-center">
            <Button
              className={'tw:rounded-none'}
              type="submit"
              form="signup-form"
              size="default"
              aria-label="Criar uma conta"
              disabled={isLoading}
            >
              Criar nova conta
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignWithGoogle}
              aria-label="Criar conta com o Google"
            >
              Criar com Google
              <GoogleLogoIcon color="red" />
            </Button>
          </Field>
          <Button
            type="button"
            variant="ghost"
            role="navigation"
            aria-label="Navegar para a página de login"
            onClick={() => navigate('/signin')}
          >
            Fazer login
          </Button>
          <Button
            className="tw:text-blue-600 "
            type="button"
            variant="ghost"
            size="sm"
            role="navigation"
            aria-label="Voltar para a última página"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignUp;
