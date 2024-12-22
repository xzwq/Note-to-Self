import React, { useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaWrapperProps {
  onVerify: (token: string | null) => void;
  onError: () => void;
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

if (!RECAPTCHA_SITE_KEY) {
  throw new Error('Missing reCAPTCHA site key in environment variables');
}

export function ReCaptchaWrapper({ onVerify, onError }: ReCaptchaWrapperProps) {
  const handleChange = useCallback((token: string | null) => {
    onVerify(token);
  }, [onVerify]);

  const handleError = useCallback(() => {
    onError();
  }, [onError]);

  return (
    <ReCAPTCHA
      sitekey={RECAPTCHA_SITE_KEY}
      theme="dark"
      onChange={handleChange}
      onError={handleError}
    />
  );
}