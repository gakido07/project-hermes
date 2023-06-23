import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';
import { ReactComponent as Spinner } from '@projecthermes/client/assets/svgs/spinner.svg';

interface props {
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({
  loading,
  children,
  disabled,
  type,
  onClick,
  className,
}: props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={loading || disabled}
      type={type || 'button'}
      onClick={onClick}
      className={className || styles.button}
      style={{
        justifyContent: loading ? 'center' : 'space-between',
      }}
    >
      {loading && <Spinner />}
      {!loading && children}
    </button>
  );
}
