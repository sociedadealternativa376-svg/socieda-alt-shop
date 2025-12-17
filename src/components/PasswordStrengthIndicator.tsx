import { Check, X } from 'lucide-react';
import { passwordRequirements, getPasswordStrength, isCommonPassword } from '@/lib/passwordValidation';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const { strength, label, color } = getPasswordStrength(password);
  const commonPassword = isCommonPassword(password);

  return (
    <div className="space-y-3">
      {/* Barra de força */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Força da senha</span>
          <span className={`font-medium ${
            strength < 30 ? 'text-destructive' : 
            strength < 50 ? 'text-orange-500' : 
            strength < 70 ? 'text-yellow-500' : 'text-green-500'
          }`}>
            {label}
          </span>
        </div>
        <Progress value={strength} className="h-2" />
      </div>

      {/* Aviso de senha comum */}
      {commonPassword && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
          <p className="text-sm text-destructive flex items-center gap-2">
            <X className="h-4 w-4 shrink-0" />
            Esta senha é muito comum e foi exposta em vazamentos de dados. Escolha uma senha mais segura.
          </p>
        </div>
      )}

      {/* Requisitos */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Requisitos da senha:</p>
        <ul className="space-y-1.5">
          {passwordRequirements.map((req) => {
            const isValid = req.validator(password);
            return (
              <li 
                key={req.id}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  isValid ? 'text-green-500' : 'text-muted-foreground'
                }`}
              >
                {isValid ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
                {req.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
