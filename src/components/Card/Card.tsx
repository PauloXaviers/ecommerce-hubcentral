import "./Card.scss";
import { type CardProps } from "../../types/card";

const Card = ({
  title,
  description,
  image,
  children,
  className = "card",
  direction = "column",
  onClick,
}: CardProps) => {
  const cardClassName = `${className} ${direction}${onClick ? " clickable" : ""}`;
  const cardContent = (
    <>
      <img src={image} alt={`Imagem de ${title}`} loading="lazy" className="card-image" draggable="false" />
      <div className="card-text">
        <h3>{title}</h3>
        <h4>{description.slice(0, 40)}...</h4>
        {children}
      </div>
    </>
  );

  if (!onClick) {
    return <div className={cardClassName}>{cardContent}</div>;
  }

  return (
    <button
      type="button"
      className={cardClassName}
      onClick={onClick}
      aria-label={`${title}. ${description}`}
    >
      {cardContent}
    </button>
  );
};

export default Card;
