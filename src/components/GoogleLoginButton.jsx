import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const { loginWithJwt } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    const id_token = credentialResponse.credential;
    if (!id_token) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        loginWithJwt({ token: data.token, user: data.user });
        // redirect to home after successful login
        navigate('/');
      } else {
        console.error('Auth failed', data);
      }
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const handleError = () => {
    console.error('Google login failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;
