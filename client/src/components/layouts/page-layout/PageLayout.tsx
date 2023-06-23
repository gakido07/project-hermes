import styles from 'client/src/components/layouts/page-layout/page.layout.module.scss';
import { ReactNode } from 'react';

interface props {
  children?: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: props) {
  return (
    <div className={`${styles.pageLayout} ${className} dark`}>{children}</div>
  );
}
