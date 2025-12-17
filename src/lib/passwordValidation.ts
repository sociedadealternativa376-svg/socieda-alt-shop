import { z } from 'zod';

// Lista de senhas comuns que devem ser bloqueadas
const COMMON_PASSWORDS = [
  '123456', '123456789', '12345678', '1234567', '12345', '1234567890',
  'password', 'password1', 'password123', 'qwerty', 'qwerty123',
  'abc123', 'abcdef', 'abcd1234', '111111', '000000', '123123',
  'admin', 'admin123', 'letmein', 'welcome', 'welcome1', 'welcome123',
  'monkey', 'dragon', 'master', 'iloveyou', 'sunshine', 'princess',
  'football', 'baseball', 'soccer', 'hockey', 'batman', 'superman',
  'trustno1', 'passw0rd', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
  'senha', 'senha123', 'mudar123', 'brasil', 'flamengo', 'palmeiras',
  'corinthians', 'santos', 'saopaulo', 'gremio', 'cruzeiro',
];

export interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'Mínimo de 8 caracteres',
    validator: (password) => password.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Pelo menos uma letra maiúscula',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    label: 'Pelo menos uma letra minúscula',
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    label: 'Pelo menos um número',
    validator: (password) => /[0-9]/.test(password),
  },
  {
    id: 'special',
    label: 'Pelo menos um caractere especial (!@#$%^&*)',
    validator: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  },
];

export const isCommonPassword = (password: string): boolean => {
  return COMMON_PASSWORDS.includes(password.toLowerCase());
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Verificar se é uma senha comum
  if (isCommonPassword(password)) {
    errors.push('Esta senha é muito comum e fácil de adivinhar. Escolha uma senha mais segura.');
  }
  
  // Verificar todos os requisitos
  passwordRequirements.forEach(req => {
    if (!req.validator(password)) {
      errors.push(req.label);
    }
  });
  
  // Verificar sequências óbvias
  if (/(.)\1{3,}/.test(password)) {
    errors.push('Evite repetir o mesmo caractere mais de 3 vezes seguidas.');
  }
  
  if (/12345|23456|34567|45678|56789|67890|abcde|bcdef|cdefg/.test(password.toLowerCase())) {
    errors.push('Evite sequências óbvias como "12345" ou "abcde".');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  if (!password) return { strength: 0, label: 'Digite uma senha', color: 'bg-muted' };
  
  let strength = 0;
  
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 10;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 20;
  
  // Penalidades
  if (isCommonPassword(password)) strength = Math.max(0, strength - 50);
  if (/(.)\1{3,}/.test(password)) strength = Math.max(0, strength - 20);
  
  if (strength < 30) return { strength, label: 'Muito fraca', color: 'bg-destructive' };
  if (strength < 50) return { strength, label: 'Fraca', color: 'bg-orange-500' };
  if (strength < 70) return { strength, label: 'Razoável', color: 'bg-yellow-500' };
  if (strength < 90) return { strength, label: 'Forte', color: 'bg-green-500' };
  return { strength: 100, label: 'Muito forte', color: 'bg-green-600' };
};

export const signupSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .trim()
    .email('Email inválido')
    .max(255, 'Email deve ter no máximo 255 caracteres'),
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(72, 'Senha deve ter no máximo 72 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string()
    .trim()
    .email('Email inválido'),
  password: z.string()
    .min(1, 'Senha é obrigatória'),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
