import styles from './Modal.module.css';

type ModalProps = {
  isError?: boolean;
  message: string;
};

export function Modal({isError, message}: ModalProps) {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        {isError ? (
          <p className={styles.title}>Error Message</p>
        ) : (
          <p className={styles.title}>Info Message</p>
        )}
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
