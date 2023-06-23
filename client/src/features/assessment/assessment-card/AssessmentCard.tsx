import styles from './assessment.card.module.scss';
import { AssessmentDto } from '@projecthermes/core/dto/assessment.dto';
import { useNavigate } from 'react-router-dom';

interface props {
  assessmentDto: AssessmentDto;
}

export function AssessmentCard({ assessmentDto }: props) {
  const navigate = useNavigate();
  const handleClick = () =>
    navigate(`/home/theory-assessments/${assessmentDto?.id}`);
  return (
    <div onClick={handleClick} className={styles.assessmentCard}>
      <h4>{assessmentDto.name}</h4>
      <div className={styles.createdAt}>
        Created At: {assessmentDto.createdAt as string}
      </div>
      <p>
        {assessmentDto?.description ||
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '}
      </p>
    </div>
  );
}
