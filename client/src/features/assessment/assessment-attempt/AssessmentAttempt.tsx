import { AssessmentAttemptEntity } from '@projecthermes/theorygrader/assessment/entities/assessment.attempt';
import assessmentCardStyles from '../assessment-card/assessment.card.module.scss';
import styles from './assessment.attempt.module.scss';

interface props {
  attempt: AssessmentAttemptEntity;
}

export function AssessmentAttempt({ attempt }: props) {
  return (
    <div className={assessmentCardStyles.assessmentCard}>
      <h4>{attempt.fullName}</h4>
      <div className={assessmentCardStyles.createdAt}>
        Created At: {attempt.createdAt.toString()}
      </div>
      <div className={styles.grade}>
        grade: {attempt.grade ? attempt.grade : 'Not graded'}
      </div>
    </div>
  );
}
