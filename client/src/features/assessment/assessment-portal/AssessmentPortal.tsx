import styles from './assessment.portal.module.scss';
import { AppProfile } from '@projecthermes/client/components/app-profile/AppProfile';
import { PageLayout } from '@projecthermes/client/components/layouts/page-layout/PageLayout';
import { AssessmentPortalQuestions } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-questions/AssessmentPortalQuestions';
import { AssessmentPortalTimer } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-timer/AssessmentPortalTimer';
import { useContext } from 'react';
import { AssessmentPortalContext } from '@projecthermes/client/context/AssessmentReducerContext';
import { convertTimestampToCurrentTimezone } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-timer/logic';

export function AssessmentPortal() {
  const {
    state: { assessment },
  } = useContext(AssessmentPortalContext);
  return (
    <PageLayout className={styles.assessmentPortal}>
      <AppProfile />
      <AssessmentPortalTimer
        endDate={convertTimestampToCurrentTimezone(
          assessment.deadline.toString(),
        )}
      />
      <AssessmentPortalQuestions />
      <div></div>
    </PageLayout>
  );
}
