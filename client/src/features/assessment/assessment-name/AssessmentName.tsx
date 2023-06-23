import { AssessmentDto } from '@projecthermes/core/dto/assessment.dto';
import { ReactComponent as EditSvg } from '@projecthermes/client/assets/svgs/edit.svg';
import styles from './assessment.name.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SelectEditDropDown } from '@projecthermes/client/features/assessment/select-edit-dropdown/SelectEditDropDown';
import { AnimatePresence } from 'framer-motion';

interface props {
  assessment: AssessmentDto;
}

export function AssessmentName({ assessment }: props) {
  const navigate = useNavigate();
  const state = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = state;
  const handleIconClick = () => setSelectOpen(state => !state);
  const handleChange = (value: string) => {
    if (value === 'Edit Questions') return navigate('/');
    if (value === 'Edit Assessment') return navigate('/');
  };
  return (
    <div className={styles.assessmentName}>
      <h1>{assessment?.name}</h1>
      <EditSvg onClick={handleIconClick} />
      <AnimatePresence>
        {selectOpen && (
          <SelectEditDropDown assessment={assessment} state={state} />
        )}
      </AnimatePresence>
    </div>
  );
}

function EditDropDown() {
  return <div />;
}
