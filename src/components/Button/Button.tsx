import type { ButtonHTMLAttributes } from "react";
import "./Button.scss";

type ButtonProps = {
  buttonColor?: "red" | "green" | "gray-medium" | "blue";
  borderRadius?: "rounded" | "default";
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button - Componente de botão reutilizável
 * @param buttonColor - Cor do botão
 * @param borderRadius - Estilo de borda
 * @param children - Conteúdo do botão
 */

export const Button = ({
  buttonColor = "red",
  borderRadius = "rounded",
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button className={`button-default ${className} ${borderRadius} ${buttonColor}`} {...rest}>
      {children}
    </button>
  );
};
