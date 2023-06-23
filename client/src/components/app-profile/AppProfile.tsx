import { AuthDto } from '@projecthermes/core/dto';
import styles from './app.profile.module.scss';
import { Avatar } from '@mantine/core';
import { TextDisplay } from '@projecthermes/client/components/text-display/TextDisplay';
import { isAuthenticated } from '@projecthermes/client/config/util';

interface props {
  matricNo?: string;
  name?: string;
}
export function AppProfile({ matricNo, name }: props) {
  const authDto = isAuthenticated()
    ? JSON.parse(localStorage.getItem('authDto'))
    : null;
  const logOut = () => {};
  return (
    <div className={styles.appProfile}>
      <Avatar
        sx={{
          width: '60%',
          height: '10rem',
          marginBottom: '7vh !important',
          borderRadius: '8px',
        }}
      />
      <TextDisplay text={matricNo || 'Akinwunmi'} />
      <TextDisplay text={name || authDto?.email} />
    </div>
  );
}
