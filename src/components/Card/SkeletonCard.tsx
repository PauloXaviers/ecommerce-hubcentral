import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Card.scss";
import { useEffect, useRef, useState } from "react";

interface SkeletonProps {
  className?: string;
  direction?: "row" | "column";
}

const SkeletonCard = ({ className = "card", direction = "column" }: SkeletonProps) => {
  const [skeletonWidth, setSkeletonWidth] = useState<number>(200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((values) => {
      const width = values[0].contentRect.width;
      setSkeletonWidth(width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${className} ${direction}`} aria-hidden="true" ref={containerRef}>
      <Skeleton
        height={direction === "column" ? 240 : 80}
        width={direction === "column" ? `${skeletonWidth}px` : 110}
      />
      <div className="card-text">
        <Skeleton width={150} height={15} count={1} />
        <Skeleton width={50} height={10} />
      </div>
    </div>
  );
};

export default SkeletonCard;
