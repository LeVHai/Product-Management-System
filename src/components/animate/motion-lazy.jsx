import { LazyMotion,domMax,m } from 'framer-motion';

/**
 * [Reduce bundle size by lazy-loading a subset of Motion's features](https://www.framer.com/motion/lazy-motion/)
 */
export function MotionLazy({ children }) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
}
