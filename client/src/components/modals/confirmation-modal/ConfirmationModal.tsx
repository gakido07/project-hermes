import { Modal } from '@mantine/core';
import { ReactNode, useState } from 'react';
import styles from './confirmation.modal.module.scss';

interface props {
  title?: string;
  children: ReactNode;
  onAgree?: () => Promise<void>;
  onCancel?: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function ConfirmationModal({
  title,
  onAgree,
  onCancel,
  children,
  open,
  setOpen,
}: props) {
  const handleClose = () => setOpen(false);
  const handleAgree = async () => {
    try {
      await onAgree();
      handleClose();
    } catch (error) {}
  };
  const handleReject = async () => {
    try {
      await onCancel();
      handleClose();
    } catch (error) {}
  };

  return open ? (
    <Modal opened={open} onClose={handleClose} title={title}>
      {children}
      <div className={styles.buttonContainer}>
        <button onClick={handleAgree}>Yes</button>
        <button onClick={handleReject}>No</button>
      </div>
    </Modal>
  ) : null;
}
