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
  return (
    <button
      type="button"
      className={`${className} ${direction}`}
      onClick={onClick}
      aria-label={`${title}. ${description}`}
    >
      <img src={image} alt={`Imagem de ${title}`} loading="lazy" className="card-image" draggable="false" />
      <div className="card-text">
        <h3>{title}</h3>
        <h4>{description.slice(0, 40)}...</h4>
        {children}
      </div>
    </button>
  );
};

export default Card;
