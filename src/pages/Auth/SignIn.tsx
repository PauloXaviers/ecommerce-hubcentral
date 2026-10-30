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
import { GoogleLogoIcon } from '@phosphor-icons/react';
import { variants } from './motion-variants';
import InputController from '@/components/InputController/InputController';
import { useSignIn } from '@/hooks/auth/useSignIn';

const SignIn = () => {

  const { form, onSubmit, handleSignWithGoogle, isLoading, navigate } = useSignIn()

  return (
    <section className="tw:w-full tw:min-h-screen tw:flex tw:items-center tw:justify-center">
      <Card size="default" variants={variants} initial="right" animate="visible">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Você pode fazer login com o seu e-mail e senha ou entrar com o Google
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
              <InputController
                name="password"
                control={form.control}
                label="Insira a sua senha"
                inputId="password"
                type="password"
                placeholder="*********"
                autoComplete="current-password"
              />
              <Button
                size="sm"
                className="tw:hover:bg-none!"
                type="button"
                variant="link"
                onClick={() => navigate('/forget-password')}
              >
                Esqueci minha senha
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal" className="tw:w-full tw:justify-center ">
            <Button
              className={'tw:rounded-none'}
              size="default"
              type="submit"
              form="sign-form"
              aria-label="Fazer login com e-mail e senha"
              disabled={isLoading}
            >
              Entrar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignWithGoogle}
              aria-label="Fazer login com google"
            >
              Entrar com Google
              <GoogleLogoIcon color="red" />
            </Button>
          </Field>
          <Button
            type="button"
            variant="ghost"
            role="navigation"
            aria-label="Navegar para a página de criar uma conta"
            onClick={() => navigate('/signup')}
          >
            Criar conta
          </Button>
          <Button
            className="tw:text-blue-600 tw:hover:bg-none!"
            type="button"
            variant="ghost"
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
export default SignIn;
