import styles from './sidebar.module.scss';
import { Logo } from '@projecthermes/client/components/logo/Logo';
import { Nav } from '@projecthermes/client/components/Nav/Nav';

export function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Nav />
    </div>
  );
}
