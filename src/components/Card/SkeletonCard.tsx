import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Card.scss";

interface SkeletonProps {
  className?: string;
  direction?: "row" | "column";
}

const SkeletonCard = ({ className = "card", direction = "column" }: SkeletonProps) => {
  return (
    <div className={`${className} ${direction}`} aria-hidden="true">
      <Skeleton height={direction === "column" ? 200 : 110} width={ direction === "column" ? "200px" : 110} />
      <div className="card-text">
        <Skeleton width={150} height={15} count={2}/>
        <Skeleton width={50} height={10} />
      </div>
    </div>
  );
};

export default SkeletonCard;
