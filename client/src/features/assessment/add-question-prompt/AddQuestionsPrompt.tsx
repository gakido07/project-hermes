import styles from './add.question.prompt.module.scss';
import { useContext } from 'react';
import { CtapContext } from '@projecthermes/client/context/CtapContext';
import { useNavigate } from 'react-router-dom';
import { CreateAssessmentDto } from '@projecthermes/core/dto';
import { Modal } from '@mantine/core';
import { BACKGROUND } from '@projecthermes/client/styles';

interface props {
  opened: boolean;
  controls: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
}

export function AddQuestionsPrompt({
  opened,
  controls: { close, open },
}: props) {
  const {
    state: { assessment },
    dispatch,
  } = useContext(CtapContext);
  const navigate = useNavigate();
  const handleYes = () => {
    dispatch({
      editQuestions: true,
    });
    close();
  };
  const handleNo = () => {
    if (!(assessment instanceof CreateAssessmentDto)) {
      navigate(`/home/theory-assessments/${assessment?.id}`);
    }
    close();
  };
  return (
    <Modal
      opened={opened}
      onClose={handleNo}
      centered
      title="Edit Questions?"
      styles={{
        content: {
          background: BACKGROUND,
          color: 'white',
        },
        header: {
          background: BACKGROUND,
          color: 'white',
        },
      }}
    >
      <ModalContent handleNo={handleNo} handleYes={handleYes} />
    </Modal>
  );
}

interface ModalContentProps {
  handleYes: () => void;
  handleNo: () => void;
}

function ModalContent({ handleYes, handleNo }: ModalContentProps) {
  return (
    <div className={styles.addQuestionPrompt}>
      <p>Do you want to edit questions right now?</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}
