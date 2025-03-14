import { encryptData, decryptData } from './encryption';

const STORAGE_KEY = 'hydia_passwords';

export const generatePassword = (length = 12, options = {
  numbers: true,
  uppercase: true,
  special: true,
  lowercase: true
}) => {
  let chars = '';
  if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) chars += '0123456789';
  if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.special) chars += '@&!#$%^*';

  let password = '';
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }

  return password;
};

export const calculatePasswordStrength = (password) => {
  let score = 0;
  
  // Longueur
  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;
  
  // Complexité
  if (/[0-9]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Variété des caractères
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 8) score += 1;
  
  if (score >= 6) return 'strong';
  if (score >= 4) return 'medium';
  return 'weak';
};

export const savePasswords = async (passwords, masterPassword) => {
  try {
    const encrypted = await encryptData(passwords, masterPassword);
    localStorage.setItem(STORAGE_KEY, encrypted);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des mots de passe:', error);
    throw error;
  }
};

export const loadPasswords = async (masterPassword) => {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) return [];
    
    return await decryptData(encrypted, masterPassword);
  } catch (error) {
    console.error('Erreur lors du chargement des mots de passe:', error);
    throw error;
  }
};

export const addPassword = async (passwordData, passwords, masterPassword) => {
  const strength = calculatePasswordStrength(passwordData.password);
  const newPassword = {
    ...passwordData,
    id: Date.now(),
    strength,
    lastUpdated: new Date(),
    isFavorite: false
  };
  
  const updatedPasswords = [...passwords, newPassword];
  await savePasswords(updatedPasswords, masterPassword);
  return updatedPasswords;
};

export const updatePassword = async (id, updates, passwords, masterPassword) => {
  const updatedPasswords = passwords.map(pwd => 
    pwd.id === id 
      ? { 
          ...pwd, 
          ...updates, 
          lastUpdated: new Date(),
          strength: updates.password ? calculatePasswordStrength(updates.password) : pwd.strength 
        }
      : pwd
  );
  
  await savePasswords(updatedPasswords, masterPassword);
  return updatedPasswords;
};

export const deletePassword = async (id, passwords, masterPassword) => {
  const updatedPasswords = passwords.filter(pwd => pwd.id !== id);
  await savePasswords(updatedPasswords, masterPassword);
  return updatedPasswords;
};

export const toggleFavorite = async (id, passwords, masterPassword) => {
  const updatedPasswords = passwords.map(pwd =>
    pwd.id === id ? { ...pwd, isFavorite: !pwd.isFavorite } : pwd
  );
  
  await savePasswords(updatedPasswords, masterPassword);
  return updatedPasswords;
};
