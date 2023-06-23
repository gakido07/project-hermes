import styles from 'client/src/features/assessment/create-assessment-link/create.assessment.link.module.scss';
import { ReactComponent as PlusIcon } from '@projecthermes/client/assets/svgs/plus.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '@projecthermes/client/common/constants';

export function CreateAssessmentLink() {
  return (
    <Link
      to={ROUTES.CREATE_ASSESSMENT}
      className={styles.createAssessmentbutton}
    >
      <PlusIcon />
      <h5>CREATE ASSESSMENT</h5>
    </Link>
  );
}
