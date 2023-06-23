import styles from './nested.home.layout.module.scss';
import { ReactNode } from 'react';

interface props {
  children?: ReactNode;
  className?: string;
}

export function NestedHomeLayout({ children, className }: props) {
  return (
    <div className={`${styles.nestedHomeLayout} ${className}`}>{children}</div>
  );
}
