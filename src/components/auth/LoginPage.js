import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/image 14.png';

const LoadingScreen = ({ loadingText }) => (
  <div className="fixed inset-0 bg-[#171A21] flex flex-col items-center justify-center">
    <img
      src={logo}
      alt="Hydia Logo"
      className="w-20 h-auto object-contain mb-8"
    />
    <div className="h-2 w-64 bg-[#1E222B] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#2DD4BF]"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
    </div>
    <p className="mt-4 text-[#2DD4BF] text-lg">
      {loadingText}
    </p>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingText, setCurrentLoadingText] = useState('Déchiffrement de vos données...');
  
  const handleLogin = () => {
    setIsLoading(true);
    
    // Redirection après 3 secondes
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen loadingText={currentLoadingText} />
      ) : (
        <div className="min-h-screen bg-[#171A21] flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <img
                src={logo}
                alt="Hydia Logo"
                className="w-20 h-auto object-contain mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-white mb-2">
                Bienvenue sur Hydia
              </h1>
              <p className="text-gray-400">
                Votre gestionnaire de mots de passe sécurisé
              </p>
            </div>

            <motion.div
              className="bg-[#1E222B] rounded-lg p-8 shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                onClick={handleLogin}
                className="w-full bg-[#2DD4BF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#26b8a5] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Se connecter
              </motion.button>

              <p className="mt-4 text-center text-sm text-gray-400">
                En vous connectant, vous acceptez nos{' '}
                <a href="#" className="text-[#2DD4BF] hover:underline">
                  conditions d'utilisation
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
