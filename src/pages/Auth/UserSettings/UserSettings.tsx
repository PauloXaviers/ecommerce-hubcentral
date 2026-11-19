import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useSettings } from '@/hooks/auth/useSettings';
import { SignOutIcon, XIcon } from '@phosphor-icons/react';
import { useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import InputController from '@/components/InputController/InputController';
import ActionsButtons from '@/components/ActionsButtons/ActionsButtons';
import SocialMedia from '@/components/SocialMedia/SocialMedia';
import './UserSettings.scss';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

const UserSettings = () => {
  const settings = useSettings();

  useEffect(() => {
    document.title = 'HubCentral | Minha conta';
  }, []);

  useEffect(() => {
    if (settings.inputEdit === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && settings.inputEdit !== null) {
        settings.handleUpdateSetting(settings.inputEdit);
      }
      if (e.key === 'Escape') {
        settings.setInputEdit(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [settings.inputEdit, settings]);

  return (
    <main className="user-settings-main">
      <h1>Minha conta</h1>
      <p>
        Nesta seção você pode gerenciar as informações da sua conta.{' '}
        <b>Nota: algumas alterações exigirão que você faça login novamente.</b>
      </p>
      <Card className="card-settings">
        <CardTitle>Meus dados</CardTitle>
        <CardContent className="container-inputs">
          <InputController
            name="name"
            label="Nome"
            control={settings.form.control}
            inputId="name"
            autoComplete="name"
            type="text"
            disabled={!(settings.inputEdit === 'name')}
          />
          <ActionsButtons
            name="name"
            setInputEdit={settings.setInputEdit}
            inputEdit={settings.inputEdit}
            isLoading={settings.isLoading}
            handleUpdateSetting={settings.handleUpdateSetting}
          />
          <InputController
            name="email"
            label="E-mail"
            control={settings.form.control}
            inputId="email"
            autoComplete="email"
            type="email"
            disabled={!(settings.inputEdit === 'email')}
          />
          <ActionsButtons
            name="email"
            setInputEdit={settings.setInputEdit}
            inputEdit={settings.inputEdit}
            isLoading={settings.isLoading}
            handleUpdateSetting={settings.handleUpdateSetting}
          />
          <InputController
            name="password"
            label="Senha"
            control={settings.form.control}
            inputId="password"
            autoComplete="new-password"
            type="password"
            disabled={!(settings.inputEdit === 'password')}
          />
          {settings.inputEdit === 'password' && (
            <InputController
              name="confirmPassword"
              label="Confirme a senha"
              control={settings.form.control}
              inputId="confirmPassword"
              autoComplete="new-password"
              type="password"
              disabled={!(settings.inputEdit === 'password')}
            />
          )}
          <ActionsButtons
            name="password"
            setInputEdit={settings.setInputEdit}
            inputEdit={settings.inputEdit}
            isLoading={settings.isLoading}
            handleUpdateSetting={settings.handleUpdateSetting}
          />

          <div className="tw:flex tw:gap-5 tw:items-center tw:justify-center">
            <Button
              variant="outline"
              disabled={settings.isLoading}
              className="tw:text-[#2c2c2c]"
              onClick={async () => await signOut(auth)}
            >
              <SignOutIcon />
              Sair da conta
            </Button>
            <Dialog>
              <DialogTrigger
                type="button"
                disabled={settings.isLoading}
                render={
                  <Button variant="destructive">
                    <XIcon color="red" />
                    Excluir conta
                  </Button>
                }
              />
              <DialogContent showCloseButton={false}>
                <DialogHeader>Tem certeza que deseja excluir sua conta?</DialogHeader>
                <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline">Cancelar</Button>} />
                  <Button variant="destructive" onClick={settings.handleDeleteAccount}>
                    Excluir
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <SocialMedia />
    </main>
  );
};

export default UserSettings;
