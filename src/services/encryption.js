// Utilisation de l'API Web Crypto pour le cryptage sécurisé
const getKey = async (password) => {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('Hydia Salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
};

export const encryptData = async (data, masterPassword) => {
  try {
    const key = await getKey(masterPassword);
    const enc = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      enc.encode(JSON.stringify(data))
    );

    const encryptedData = new Uint8Array(encrypted);
    const result = new Uint8Array(iv.length + encryptedData.length);
    result.set(iv);
    result.set(encryptedData, iv.length);

    return btoa(String.fromCharCode.apply(null, result));
  } catch (error) {
    console.error('Erreur lors du cryptage:', error);
    throw error;
  }
};

export const decryptData = async (encryptedData, masterPassword) => {
  try {
    const key = await getKey(masterPassword);
    const dec = new TextDecoder();
    const data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encrypted
    );

    return JSON.parse(dec.decode(decrypted));
  } catch (error) {
    console.error('Erreur lors du décryptage:', error);
    throw error;
  }
};
