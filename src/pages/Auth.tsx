import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowLeft, Sparkles, KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { 
  signupSchema, 
  loginSchema, 
  validatePassword,
  SignupFormData, 
  LoginFormData 
} from '@/lib/passwordValidation';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface LocationState {
  from?: string;
  orderData?: {
    items: any[];
    total: number;
    orderId: string;
  };
}

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const locationState = location.state as LocationState | null;
  const redirectTo = locationState?.from || '/';
  const orderData = locationState?.orderData;

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // If there's pending order data, redirect to checkout
      if (orderData && redirectTo === '/checkout/pix') {
        navigate('/checkout/pix', { state: orderData });
      } else {
        navigate(redirectTo);
      }
    }
  }, [user, navigate, redirectTo, orderData]);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const forgotForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Email ou senha incorretos. Verifique suas credenciais.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Email não confirmado. Verifique sua caixa de entrada.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Login realizado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    // Validação extra de senha
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.errors[0]);
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('Este email já está cadastrado. Faça login ou use outro email.');
        } else if (error.message.includes('Password should be at least')) {
          toast.error('A senha não atende aos requisitos mínimos de segurança.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Cadastro realizado com sucesso! Verifique seu email para confirmar.');
        setMode('login');
        loginForm.setValue('email', data.email);
      }
    } catch (error) {
      toast.error('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await resetPassword(data.email);
      if (error) {
        toast.error(error.message || 'Erro ao enviar email de recuperação.');
      } else {
        setEmailSent(true);
        toast.success('Email de recuperação enviado!');
      }
    } catch (error) {
      toast.error('Erro ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message || 'Erro ao fazer login com Google.');
      }
    } catch (error) {
      toast.error('Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const switchMode = (newMode: 'login' | 'signup' | 'forgot') => {
    setMode(newMode);
    setPasswordValue('');
    setEmailSent(false);
    loginForm.reset();
    signupForm.reset();
    forgotForm.reset();
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Bem-vindo de volta';
      case 'signup': return 'Criar conta';
      case 'forgot': return 'Recuperar senha';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'login': return 'Entre com suas credenciais para continuar';
      case 'signup': return 'Preencha os dados para criar sua conta';
      case 'forgot': return emailSent ? 'Verifique sua caixa de entrada' : 'Enviaremos um link para redefinir sua senha';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-warm-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => mode === 'forgot' ? switchMode('login') : navigate('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {mode === 'forgot' ? 'Voltar para login' : 'Voltar para a loja'}
        </Button>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display gradient-text mb-2">
              {getTitle()}
            </h1>
            <p className="text-muted-foreground text-sm">
              {getSubtitle()}
            </p>
          </div>

          {/* Forgot Password Form */}
          {mode === 'forgot' ? (
            emailSent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enviamos um email para <strong>{forgotForm.getValues('email')}</strong> com instruções para redefinir sua senha.
                </p>
                <p className="text-xs text-muted-foreground">
                  Não recebeu? Verifique sua pasta de spam ou
                  <button
                    type="button"
                    onClick={() => setEmailSent(false)}
                    className="ml-1 text-primary hover:underline"
                  >
                    tente novamente
                  </button>
                </p>
                <Button 
                  onClick={() => switchMode('login')}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Voltar para login
                </Button>
              </div>
            ) : (
              <form onSubmit={forgotForm.handleSubmit(handleForgotPassword)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      {...forgotForm.register('email')}
                    />
                  </div>
                  {forgotForm.formState.errors.email && (
                    <p className="text-xs text-destructive">{forgotForm.formState.errors.email.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <KeyRound className="h-4 w-4 mr-2" />
                      Enviar link de recuperação
                    </>
                  )}
                </Button>
              </form>
            )
          ) : mode === 'login' ? (
            /* Login Form */
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    {...loginForm.register('email')}
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-xs text-destructive">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Senha</Label>
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...loginForm.register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-destructive">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red hover:opacity-90"
                disabled={isLoading}
              >
               {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou continue com</span>
                </div>
              </div>

              {/* Google Login Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Google
              </Button>
            </form>
          ) : (
            /* Signup Form */
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Seu nome"
                    className="pl-10"
                    {...signupForm.register('fullName')}
                  />
                </div>
                {signupForm.formState.errors.fullName && (
                  <p className="text-xs text-destructive">{signupForm.formState.errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    {...signupForm.register('email')}
                  />
                </div>
                {signupForm.formState.errors.email && (
                  <p className="text-xs text-destructive">{signupForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...signupForm.register('password')}
                    onChange={(e) => {
                      signupForm.register('password').onChange(e);
                      setPasswordValue(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {signupForm.formState.errors.password && (
                  <p className="text-xs text-destructive">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              {/* Password strength indicator */}
              {passwordValue && (
                <PasswordStrengthIndicator password={passwordValue} />
              )}

              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...signupForm.register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {signupForm.formState.errors.confirmPassword && (
                  <p className="text-xs text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Criar conta
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou cadastre-se com</span>
                </div>
              </div>

              {/* Google Login Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Google
              </Button>
            </form>
          )}

          {/* Toggle mode */}
          {mode !== 'forgot' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button
                  type="button"
                  onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-1 text-primary hover:underline font-medium"
                >
                  {mode === 'login' ? 'Criar conta' : 'Fazer login'}
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Ao criar uma conta, você concorda com nossos{' '}
          <a href="#" className="text-primary hover:underline">Termos de Uso</a>
          {' '}e{' '}
          <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
