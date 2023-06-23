import styles from 'client/src/features/assessment/assessment-list/assessment.list.sorter.module.scss';
import { CreateAssessmentLink } from '@projecthermes/client/features/assessment/create-assessment-link/CreateAssessmentLink';
import { useQuery } from '@tanstack/react-query';
import { api } from '@projecthermes/client/config/api';
import { AssessmentCard } from '@projecthermes/client/features/assessment/assessment-card/AssessmentCard';

export function AssessmentListSorter() {
  const { data: response } = useQuery({
    queryFn: () => api.getAssessmentsByOrganizerId(),
  });
  const assessments = response?.data;
  return (
    <div className={styles.assessmentList}>
      <CreateAssessmentLink />
      {assessments &&
        assessments.map(assessment => (
          <AssessmentCard assessmentDto={assessment} />
        ))}
    </div>
  );
}
