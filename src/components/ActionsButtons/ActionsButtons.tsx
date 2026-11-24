import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { type UpdateInfos } from '@/hooks/auth/useSettings';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';

type ActionsButtonsProps = {
  name: keyof UpdateInfos;
  inputEdit: keyof UpdateInfos | null;
  isLoading: boolean;
  setInputEdit: Dispatch<SetStateAction<keyof UpdateInfos | null> >;
  handleUpdateSetting: (field: keyof UpdateInfos) => Promise<void>;
};

const ActionsButtons = ({
  name,
  inputEdit,
  isLoading,
  setInputEdit,
  handleUpdateSetting,
}: ActionsButtonsProps) => {
  const isValid = name === inputEdit;

  return (
    <div>
      {isValid ? (
        <div className="tw:flex tw:gap-2">
          <Button type="button" variant="outline" onClick={() => setInputEdit(null)}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() => handleUpdateSetting(name)}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Salvar'}
          </Button>
        </div>
      ) : (
        <Button type="button" variant="secondary" onClick={() => setInputEdit(name)}>
          Editar
          <PencilSimpleLineIcon weight="regular" />
        </Button>
      )}
    </div>
  );
};

export default ActionsButtons;
