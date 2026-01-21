import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Copy, Check, Clock, QrCode, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { CartItem } from '@/types/product';

interface OrderData {
  items: CartItem[];
  total: number;
  orderId: string;
}

const PixCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const orderData = location.state as OrderData | null;
  
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'pending' | 'paid' | 'expired'>('pending');

  // Mock Pix code - in production this would come from API
  const pixCode = '00020126580014br.gov.bcb.pix0136a629534e-7693-4846-b028-example5204000053039865802BR5925LOJA EXEMPLO LTDA6009SAO PAULO62070503***6304ABCD';

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Login necessário",
        description: "Faça login para continuar com o pagamento.",
        variant: "destructive",
      });
      navigate('/auth', { state: { from: '/checkout/pix', orderData } });
    }
  }, [user, authLoading, navigate, orderData]);

  // Redirect if no order data
  useEffect(() => {
    if (!authLoading && user && !orderData) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho para fazer o checkout.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [orderData, user, authLoading, navigate]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (status !== 'pending' || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, timeLeft]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast({
        title: "Código copiado!",
        description: "Cole no app do seu banco para pagar.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Tente selecionar e copiar manualmente.",
        variant: "destructive",
      });
    }
  };

  const handleConfirmPayment = () => {
    // In production, this would verify with API
    // For now, simulate success
    setStatus('paid');
    toast({
      title: "Verificando pagamento...",
      description: "Aguarde enquanto confirmamos seu pagamento.",
    });
    
    setTimeout(() => {
      navigate('/checkout/sucesso', { 
        state: { 
          orderId: orderData?.orderId,
          total: orderData?.total,
          items: orderData?.items
        } 
      });
    }, 2000);
  };

  const progressPercentage = (timeLeft / 600) * 100;

  const getStatusConfig = () => {
    switch (status) {
      case 'paid':
        return {
          label: 'Pagamento confirmado',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-950/30',
          borderColor: 'border-green-200 dark:border-green-800',
        };
      case 'expired':
        return {
          label: 'Pagamento expirado',
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
        };
      default:
        return {
          label: 'Aguardando pagamento',
          color: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-50 dark:bg-amber-950/30',
          borderColor: 'border-amber-200 dark:border-amber-800',
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-56 w-56 rounded-xl" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !orderData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-border/50 animate-fade-in">
        <CardHeader className="text-center pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="absolute left-4 top-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <CardTitle className="text-2xl font-display tracking-wide">
            Pagamento via Pix
          </CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Pedido #{orderData.orderId}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Badge */}
          <div
            className={cn(
              "flex items-center justify-center gap-2 py-2 px-4 rounded-full border text-sm font-medium mx-auto w-fit transition-all",
              statusConfig.bgColor,
              statusConfig.borderColor,
              statusConfig.color
            )}
          >
            {status === 'pending' && <Clock className="h-4 w-4 animate-pulse" />}
            {status === 'expired' && <AlertCircle className="h-4 w-4" />}
            {status === 'paid' && <Check className="h-4 w-4" />}
            {statusConfig.label}
          </div>

          {/* Order Summary */}
          <div className="bg-secondary/30 rounded-lg p-3 space-y-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Resumo do pedido
            </p>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-foreground">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-muted-foreground">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Value */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Valor total</p>
            <p className="text-3xl font-bold text-foreground">
              R$ {orderData.total.toFixed(2).replace('.', ',')}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            {isLoading ? (
              <Skeleton className="w-56 h-56 rounded-xl" />
            ) : (
              <div className="relative p-4 bg-white rounded-xl shadow-inner border border-border/30">
                <div className="w-48 h-48 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <QrCode className="w-24 h-24 opacity-30" />
                  <span className="text-xs text-center">
                    QR Code será exibido aqui
                  </span>
                </div>
                {status === 'expired' && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <p className="text-destructive font-medium">Expirado</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Timer with Progress */}
          {status === 'pending' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tempo restante</span>
                <span className={cn(
                  "font-mono font-bold",
                  timeLeft <= 60 ? "text-destructive" : "text-foreground"
                )}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Progress 
                value={progressPercentage} 
                className={cn(
                  "h-2 transition-all",
                  timeLeft <= 60 && "[&>div]:bg-destructive"
                )}
              />
            </div>
          )}

          {/* Pix Copy & Paste */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Pix Copia e Cola
            </label>
            {isLoading ? (
              <Skeleton className="h-20 w-full rounded-lg" />
            ) : (
              <div className="relative">
                <div className="p-3 bg-secondary/50 rounded-lg border border-border/50 text-xs font-mono text-muted-foreground break-all max-h-20 overflow-y-auto">
                  {pixCode}
                </div>
              </div>
            )}
            <Button
              onClick={handleCopyCode}
              disabled={isLoading || status === 'expired'}
              className={cn(
                "w-full h-12 text-base font-medium transition-all",
                copied 
                  ? "bg-green-600 hover:bg-green-600 text-white" 
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Código copiado!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5 mr-2" />
                  Copiar código
                </>
              )}
            </Button>
          </div>

          {/* Already Paid Button */}
          <Button
            variant="outline"
            disabled={status !== 'pending'}
            onClick={handleConfirmPayment}
            className="w-full h-12 text-base border-2"
          >
            Já paguei
          </Button>

          {/* Instructions */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Abra o app do seu banco, escolha pagar com Pix e escaneie o QR Code ou cole o código acima.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PixCheckout;
