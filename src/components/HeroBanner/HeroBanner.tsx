import { Button } from "../Button/Button";
import "./HeroBanner.scss";

interface HeroBannerProps {
  backgroundImage?: string;
  onClick?: () => void;
  className?: string;
  title: string;
  subtitle: string;
  subTitleSpan?: boolean;
  subTitleText?: string;
  subtitleSpanColor?: "red" | "red-accent" | "green" | "gray-medium" | "blue";
  button?: boolean;
  buttonText?: string;
  buttonColor?: "red" | "green" | "gray-medium" | "blue";
  children?: React.ReactNode;
}

/**
 * HeroBanner - Componente de banner promocional
 * @param title - Título principal
 * @param subtitle - Subtítulo
 */

const HeroBanner = ({
  backgroundImage,
  onClick,
  className = "hero-banner",
  title,
  subtitle,
  subTitleSpan,
  subTitleText,
  subtitleSpanColor = "red-accent",
  button,
  buttonText = "Compre agora",
  buttonColor = "red",
  children,
}: HeroBannerProps) => {
  return (
    <section
      className={`${className}`}
      role="banner"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Banner promocional"
    >
      <h1 id={title}>{title}</h1>
      <p aria-describedby="hero-subtitle">
        {subtitle}
        {subTitleSpan && (
          <span role="emphasis" className={subtitleSpanColor}>
            {subTitleText}
          </span>
        )}
      </p>
      {button && (
        <Button
          buttonColor={buttonColor}
          onClick={onClick}
          type="button"
          aria-label={`${buttonText} - ${title}`.toLocaleLowerCase()}
        >
          {buttonText}
        </Button>
      )}
      {children}
    </section>
  );
};
export default HeroBanner;
