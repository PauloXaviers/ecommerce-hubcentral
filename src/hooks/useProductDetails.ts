import { useCallback, useEffect, useRef, useState } from 'react';
import { useProduct } from '../context/useProduct';

export const useProductDetails = () => {
  const product = useProduct((state) => state.selectedProduct);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const [isDragging, setIsDragging] = useState(false);

  const carouselContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (carouselContainerRef.current)
      setScrollWidth(
        carouselContainerRef.current.scrollWidth - carouselContainerRef.current.offsetWidth
      );
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setSelectedImage(product?.images[0]), 0);
    return () => clearTimeout(id);
  }, [product?.images]);

  const onDragStart = useCallback(() => setIsDragging(true), []);
  const onDragEnd = useCallback(() => setIsDragging(false), []);

  const handleClickSelectImage = useCallback(
    (index: number) => {
      if (!isDragging) setSelectedImage(product?.images[index]);
    },
    [isDragging, product?.images]
  );

  return { scrollWidth, carouselContainerRef, handleClickSelectImage, selectedImage, onDragStart, onDragEnd };
};
