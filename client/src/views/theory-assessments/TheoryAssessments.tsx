import styles from 'client/src/views/theory-assessments/theory-assessments.module.scss';
import { NestedHomeLayout } from '@projecthermes/client/components/layouts/nested-home-layout/NestedHomeLayout';
import { AssessmentListSorter } from '@projecthermes/client/features/assessment/assessment-list/AssessmentListSorter';
import { Back } from '@projecthermes/client/components/back/Back';

export function TheoryAssessments() {
  return (
    <NestedHomeLayout className={styles.theoryAssessment}>
      <h1>Theory Assessments</h1>
      <AssessmentListSorter />
    </NestedHomeLayout>
  );
}
