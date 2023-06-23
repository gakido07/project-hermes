import styles from './select.edit.dropdown.module.scss';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { AssessmentDto } from '@projecthermes/core/dto/assessment.dto';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@projecthermes/client/common/constants';

interface props {
  assessment: AssessmentEntity | AssessmentDto;
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}

export function SelectEditDropDown({ assessment, state }: props) {
  const [open] = state;
  const navigate = useNavigate();
  return (
    <motion.div
      className={
        open ? styles.selectEditDropDownOpen : styles.selectEditDropDown
      }
      initial={{ opacity: 0, maxHeight: '0rem', width: '0vw' }}
      animate={{ opacity: 1, maxHeight: '17rem', width: '10vw' }}
      exit={{ opacity: 0, maxHeight: '0rem', width: '0vw' }}
      key="select-edit-dropdown"
    >
      <div>Edit Assessment</div>
      <div
        onClick={() =>
          navigate(`${ROUTES.CREATE_ASSESSMENT}?edit-questions=true`, {
            state: assessment,
          })
        }
      >
        Edit Questions
      </div>
    </motion.div>
  );
}
