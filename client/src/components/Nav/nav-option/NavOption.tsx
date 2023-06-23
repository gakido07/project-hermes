import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import styles from './nav.option.module.scss';

interface props {
  path: string;
  children: ReactNode;
}

export function NavOption({ path, children }: props) {
  const { pathname } = useLocation();
  const active = path === pathname;
  return (
    <Link
      style={{
        background: active ? '#3EBF4B' : 'none',
      }}
      className={styles.navOption}
      to={path}
    >
      {children}
    </Link>
  );
}
