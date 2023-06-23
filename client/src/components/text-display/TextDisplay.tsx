import styles from './text.display.module.scss';

interface props {
  text: string;
}

export function TextDisplay({ text }: props) {
  return <div className={styles.textDisplay}>{text}</div>;
}
