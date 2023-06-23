import { Detail } from '@projecthermes/client/components/detail/Detail';
import styles from './assessment.view.module.scss';
import { AssessmentDto } from '@projecthermes/core/dto/assessment.dto';
import { AssessmentName } from '@projecthermes/client/features/assessment/assessment-name/AssessmentName';
import { AssessmentAttempt } from '@projecthermes/client/features/assessment/assessment-attempt/AssessmentAttempt';
import { useQuery } from '@tanstack/react-query';
import { api } from '@projecthermes/client/config/api';
import { AssessmentAttemptEntity } from '@projecthermes/theorygrader/assessment/entities/assessment.attempt';

interface props {
  assessment: AssessmentDto;
}

export function AssessmentView({ assessment }: props) {
  const { data: response } = useQuery({
    queryFn: () => api.getAssessmentAttempts(assessment.id),
    queryKey: [`assessment-attempts-${assessment.id}`],
  });
  const data = (response?.data as AssessmentAttemptEntity[]) || [];
  return (
    <div className={styles.assessmentView}>
      <AssessmentName assessment={assessment} />
      <Detail
        className={styles.detail}
        name="created on"
        content={assessment?.createdAt.toString()}
      />
      <Detail
        className={styles.detail}
        name="Deadline"
        content={assessment?.deadline.toString()}
      />
      <Detail
        className={styles.detail}
        name="Assessment link"
        content={assessment?.link}
        copyable
      />
      <div className={styles.attemptList}>
        {data.map(attempt => (
          <AssessmentAttempt attempt={attempt} />
        ))}
      </div>
    </div>
  );
}
