import type { InputHTMLAttributes } from 'react';
import { type Control, type FieldPath, type FieldValues, Controller } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '../ui/field';
import { Input } from '../ui/input';

type InputController<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  inputId: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputController = <T extends FieldValues>({
  control,
  name,
  label,
  inputId,
  ...rest
}: InputController<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.error}>
          <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

          <Input {...rest} {...field} id={inputId} aria-invalid={fieldState.invalid} />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default InputController;
