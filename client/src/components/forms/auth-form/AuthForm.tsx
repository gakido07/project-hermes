import styles from './auth-form.module.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '@projecthermes/client/assets/svgs/google.svg';
import { useQuery } from '@tanstack/react-query';
import { ReactComponent as SpinnerIcon } from '@projecthermes/client/assets/svgs/spinner.svg';
import { api } from '@projecthermes/client/config/api';
import { useAlertState } from '@projecthermes/client/hooks/useAlertState';
import { AuthDto } from '@projecthermes/core/dto';
import { useContext, useEffect } from 'react';
import { AlertContext } from '@projecthermes/client/context/AlertContext';
import { AxiosResponse } from 'axios';

export function AuthForm() {
  const serverAuthLink = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { code, success } =
    extractOauth2ResponseFromUrlSearchParams(searchParams);
  const { showAlert } = useContext(AlertContext);
  const { isLoading } = useQuery({
    queryKey: ['auth', code],
    queryFn: () => api.handleSuccessfulAuth(code),
    onSuccess: handleSuccess,
    onError: handleError,
    enabled: !!code,
  });

  function handleSuccess(response: AxiosResponse<any, any>) {
    console.log(response);
    const authDto: AuthDto = response?.data as AuthDto;
    if (!authDto) return;
    showAlert({
      message: 'Auth Successful',
      severity: 'success',
    });
    localStorage.setItem('authDto', JSON.stringify(authDto));
    navigate('/home/theory-assessments');
  }
  function handleError() {
    showAlert({
      message: 'Authentication Failed',
      severity: 'error',
    });
  }

  return (
    <div className={styles.authForm}>
      <a href={serverAuthLink} className={styles.googleAuthButton}>
        {success && code && isLoading ? (
          <SpinnerIcon />
        ) : (
          <>
            <GoogleIcon />
            Sign in with Google
          </>
        )}
      </a>
    </div>
  );
}

function extractOauth2ResponseFromUrlSearchParams(params: URLSearchParams): {
  code: string;
  success: boolean;
} {
  const code = params.get('code');
  const success = params.get('success') === 'true';
  return { code, success };
}
