import { PageLayout } from '@projecthermes/client/components/layouts/page-layout/PageLayout';
import styles from './home.module.scss';
import { Outlet } from 'react-router-dom';
import { AppProfile } from '@projecthermes/client/components/app-profile/AppProfile';
import { SideBar } from '@projecthermes/client/components/side-bar/SideBar';

export function Home() {
  return (
    <PageLayout className={styles.home}>
      <SideBar />
      <Outlet />
      <AppProfile />
    </PageLayout>
  );
}
