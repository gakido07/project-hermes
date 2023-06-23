import { PageLayout } from '@projecthermes/client/components/layouts/page-layout/PageLayout';
import styles from './auth.module.scss';
import { AuthForm } from '@projecthermes/client/components/forms/auth-form/AuthForm';

export function Auth() {
  return (
    <PageLayout className={styles.auth}>
      <h1>HERMES</h1>
      <AuthForm />
    </PageLayout>
  );
}
