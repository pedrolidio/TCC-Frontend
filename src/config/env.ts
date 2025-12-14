const getEnvVar = (key: string): string => {
  const value = process.env[key];
  
  if (!value) {
    throw new Error(`CRITICAL: A variável de ambiente obrigatória '${key}' não foi definida.`);
  }
  
  return value;
};

export const env = {
  api: {
    url: getEnvVar('API_URL'),
  },
};