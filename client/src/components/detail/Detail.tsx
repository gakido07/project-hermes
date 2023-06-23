import styles from './detail.module.scss';
import { Button, rem, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { ReactComponent as CopySvg } from '@projecthermes/client/assets/svgs/copy.svg';
import { ReactComponent as CheckSvg } from '@projecthermes/client/assets/svgs/check.svg';

interface props {
  name: string;
  content: string;
  className?: string;
  copyable?: boolean;
}

export function Detail({ name, content, className, copyable }: props) {
  const clipboard = useClipboard();
  if (copyable) {
    return (
      <Tooltip
        label="Link copied!"
        offset={5}
        position="bottom"
        radius="xl"
        transitionProps={{ duration: 100, transition: 'slide-down' }}
        opened={clipboard.copied}
      >
        <Button
          className={styles['copy-button']}
          variant="light"
          rightIcon={clipboard.copied ? <CheckSvg /> : <CopySvg />}
          radius="xl"
          size="md"
          sx={{
            width: '80%',
            height: '2rem',
          }}
          styles={{
            root: { paddingRight: rem(14), height: rem(48) },
            rightIcon: { marginLeft: rem(22) },
          }}
          onClick={() => clipboard.copy(content)}
        >
          {content}
        </Button>
      </Tooltip>
    );
  }
  return (
    <span className={`${styles.detail} ${className}`}>
      <span>{name}:</span>
      <span>{content}</span>
    </span>
  );
}
