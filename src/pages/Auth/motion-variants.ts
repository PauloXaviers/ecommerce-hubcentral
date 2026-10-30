import type { Variants } from 'motion/react';

export const variants: Variants = {
  left: { filter: 'blur(10px)', x: -30 },
  right: { filter: 'blur(10px)', x: 30 },
  visible: { filter: 'blur(0px)', x: 0, transition: { duration: 0.4 } },
};
