import styles from './nav.module.scss';
import { NavOption } from '@projecthermes/client/components/Nav/nav-option/NavOption';
import { ReactComponent as AssessmentIcon } from '@projecthermes/client/assets/svgs/theory.assessments.svg';
import { ReactComponent as PlusIcon } from '@projecthermes/client/assets/svgs/plus.svg';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <NavOption path={'/home/theory-assessments'}>
        <AssessmentIcon />
        Projects
      </NavOption>
      <NavOption path={'/home/theory-assessments/create'}>
        <PlusIcon />
        Create Project
      </NavOption>
    </nav>
  );
}
