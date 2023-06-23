import styles from './assement.portal.module.scss';
import { AssessmentPortalAuthForm } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-auth-form/AssessmentPortalAuthForm';
import { AssessmentPortal } from '@projecthermes/client/features/assessment/assessment-portal/AssessmentPortal';
import { PageLayout } from '@projecthermes/client/components/layouts/page-layout/PageLayout';
import { useWrappedReducer } from '@projecthermes/client/hooks/useWrappedReducer';
import { AssessmentPortalReducer } from '@projecthermes/client/reducers/AssessmentPortalReducer';
import { AssessmentPortalContext } from '@projecthermes/client/context/AssessmentReducerContext';

export function AssessmentPortalView() {
  const auth: boolean = false;
  const [state, dispatch] = useWrappedReducer(AssessmentPortalReducer, {
    attempt: null,
    questions: [],
    assessment: null,
  });
  return (
    <AssessmentPortalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {!state?.attempt && (
        <PageLayout className={styles.assessmentPortal}>
          <AssessmentPortalAuthForm />
        </PageLayout>
      )}
      {state?.attempt && <AssessmentPortal />}
    </AssessmentPortalContext.Provider>
  );
}
