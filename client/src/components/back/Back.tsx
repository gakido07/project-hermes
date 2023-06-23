import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '@projecthermes/client/assets/svgs/left.arrow.svg';
import styles from './back.module.scss';

export function Back() {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  return (
    <span className={styles.back} onClick={handleClick}>
      <Arrow /> Back
    </span>
  );
}
