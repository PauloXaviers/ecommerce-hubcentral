export interface CardProps {
  title: string;
  description: string;
  image: string;
  direction?: "row" | "column";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
