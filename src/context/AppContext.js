import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

const mockPasswords = [
  {
    id: 1,
    site: 'Norton.com',
    logo: 'N',
    email: 'nortonhydia@hydia.com',
    password: 'Hy#Not22@Pass',
    category: 'Projets',
    lastUsed: 'il y a 1 semaine',
    isFavorite: true,
    securityLevel: 'Fort',
    bgColor: 'bg-yellow-600'
  },
  {
    id: 2,
    site: 'Microsoftcloud.com',
    logo: 'M',
    email: 'microsoftcloudhydia@hydia.com',
    password: 'MS@Cloud2024!',
    category: 'Travail',
    lastUsed: 'il y a 3 jours',
    isFavorite: false,
    securityLevel: 'Fort',
    bgColor: 'bg-blue-600'
  },
  {
    id: 3,
    site: 'Googlemeet.com',
    logo: 'G',
    email: 'googlemeethydia@hydia.com',
    password: 'Gm3et@Hy24',
    category: 'Travail',
    lastUsed: 'il y a 2 mois',
    isFavorite: true,
    securityLevel: 'Moyen',
    bgColor: 'bg-red-500'
  },
  {
    id: 4,
    site: 'Autodesk.com',
    logo: 'A',
    email: 'autodeskhydia@hydia.com',
    password: 'Auto#Desk24!',
    category: 'Divers',
    lastUsed: 'il y a 2 semaines',
    isFavorite: false,
    securityLevel: 'Fort',
    bgColor: 'bg-blue-500'
  },
  {
    id: 5,
    site: 'Procreate.com',
    logo: 'P',
    email: 'procreatehydia@hydia.com',
    password: 'Pro@Create24',
    category: 'Travail',
    lastUsed: 'il y a 6 jours',
    isFavorite: false,
    securityLevel: 'Fort',
    bgColor: 'bg-purple-500'
  },
  {
    id: 6,
    site: 'Figma.com',
    logo: 'F',
    email: 'figmahydia@hydia.com',
    password: 'Fig@2024!Hy',
    category: 'Logiciels',
    lastUsed: 'il y a 1 semaine',
    isFavorite: false,
    securityLevel: 'Faible',
    bgColor: 'bg-purple-600'
  },
  {
    id: 7,
    site: 'Shopify.com',
    logo: 'S',
    email: 'shopifyhydia@hydia.com',
    password: 'Shop#Hy2024!',
    category: 'Travail',
    lastUsed: 'il y a 3 jours',
    isFavorite: false,
    securityLevel: 'Fort',
    bgColor: 'bg-green-600'
  },
  {
    id: 8,
    site: 'Adobecreativecloud.com',
    logo: 'Ac',
    email: 'adobecreativecloud@hydia.com',
    password: 'Adobe#CC2024!',
    category: 'Divers',
    lastUsed: 'il y a 3 jours',
    isFavorite: true,
    securityLevel: 'Moyen',
    bgColor: 'bg-red-600'
  },
  {
    id: 9,
    site: 'Adobeillustrator.com',
    logo: 'Ai',
    email: 'adobeillustrator@hydia.com',
    password: 'Ai#Hydia2024!',
    category: 'Montages',
    lastUsed: 'il y a 1 semaine',
    isFavorite: false,
    securityLevel: 'Faible',
    bgColor: 'bg-orange-600'
  },
  {
    id: 10,
    site: 'Invision.com',
    logo: 'In',
    email: 'invisionhydia@hydia.com',
    password: 'Inv#2024!Hy',
    category: 'Divers',
    lastUsed: 'il y a 2 jours',
    isFavorite: false,
    securityLevel: 'Fort',
    bgColor: 'bg-pink-600'
  },
  {
    id: 11,
    site: 'Aero.com',
    logo: 'Ar',
    email: 'aerohydia@hydia.com',
    password: 'Aero#Hy2024!',
    category: 'Travail',
    lastUsed: 'il y a 1 mois',
    isFavorite: false,
    securityLevel: 'Fort',
    bgColor: 'bg-teal-600'
  },
  {
    id: 12,
    site: 'Axure.com',
    logo: 'Ax',
    email: 'axurehydia@hydia.com',
    password: 'Axure#2024!',
    category: 'Projets',
    lastUsed: 'il y a 5 jours',
    isFavorite: true,
    securityLevel: 'Fort',
    bgColor: 'bg-blue-700'
  }
];

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwords, setPasswords] = useState(mockPasswords);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const deletePassword = (id) => {
    setPasswords(passwords.filter(password => password.id !== id));
  };

  const login = (credentials) => {
    // Simuler une authentification
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const getFilteredPasswords = () => {
    if (selectedCategory === 'all') return passwords;
    if (selectedCategory === 'favorites') return passwords.filter(p => p.isFavorite);
    return passwords.filter(p => p.category === selectedCategory);
  };

  const addPassword = (newPassword) => {
    const id = Math.max(...passwords.map(p => p.id), 0) + 1;
    
    const passwordEntry = {
      id,
      site: newPassword.site,
      logo: newPassword.site.charAt(0).toUpperCase(),
      email: newPassword.email,
      password: newPassword.password,
      category: newPassword.category,
      lastUsed: "aujourd'hui",
      isFavorite: false,
      securityLevel: newPassword.securityLevel,
      bgColor: 'bg-blue-600'
    };

    setPasswords([passwordEntry, ...passwords]);
    return passwordEntry;
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        selectedCategory,
        setSelectedCategory,
        isAuthenticated,
        login,
        logout,
        passwords: getFilteredPasswords(),
        allPasswords: passwords,
        setPasswords,
        deletePassword,
        addPassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
