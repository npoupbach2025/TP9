// Caractères possibles pour chaque type
const NUMBERS = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIAL = '@#$%^&*()_+-=[]{}|;:,.<>?';

// Fonction pour mélanger une chaîne de caractères de manière cryptographiquement sûre
const secureShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Fonction pour générer un caractère aléatoire depuis une chaîne de caractères
const getRandomChar = (characters) => {
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);
  return characters[randomValues[0] % characters.length];
};

export const generatePassword = (length, options) => {
  let chars = LOWERCASE; // Toujours inclure les minuscules
  let password = '';
  
  // Ajouter les caractères selon les options
  if (options.numbers) chars += NUMBERS;
  if (options.uppercase) chars += UPPERCASE;
  if (options.specialChars) chars += SPECIAL;

  // Assurer au moins un caractère de chaque type sélectionné
  password += getRandomChar(LOWERCASE);
  if (options.numbers) password += getRandomChar(NUMBERS);
  if (options.uppercase) password += getRandomChar(UPPERCASE);
  if (options.specialChars) password += getRandomChar(SPECIAL);

  // Générer le reste du mot de passe
  while (password.length < length) {
    password += getRandomChar(chars);
  }

  // Mélanger le mot de passe de manière sécurisée
  return secureShuffle(password.split('')).join('');
};

// Fonction pour évaluer la force du mot de passe
export const evaluatePassword = (password) => {
  let score = 0;
  
  // Longueur (max 40 points)
  score += Math.min(password.length * 4, 40);
  
  // Variété de caractères (max 60 points)
  if (/[0-9]/.test(password)) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;
  if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])/.test(password)) score += 15;
  
  return score;
};
