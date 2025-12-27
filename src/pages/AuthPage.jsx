import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-gray-900/60 backdrop-blur-sm rounded-xl p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[320px]">
        <h1 className="text-4xl font-heading mb-4">Iniciar sesión / Registrarse</h1>
        <p className="text-gray-300 mb-8">Accede con Google para guardar tu historial de compras y gestionar tu cuenta.</p>

        <div className="flex flex-col items-center gap-4">
          <GoogleLoginButton />

          <div className="text-gray-400 text-sm">Al iniciar sesión aceptas los términos y condiciones del sitio.</div>

          <Link to="/" className="mt-4 inline-block text-fortis-gold hover:underline">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
