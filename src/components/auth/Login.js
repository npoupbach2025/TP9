import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { authenticate } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const success = await authenticate(password);
      if (!success) {
        setError('Mot de passe incorrect');
      }
    } catch (error) {
      setError('Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img
            src="/assets/images/image 14.png"
            alt="Hydia Logo"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Bienvenue sur Hydia
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Gérez vos mots de passe en toute sécurité
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe maître
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Mot de passe maître"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
