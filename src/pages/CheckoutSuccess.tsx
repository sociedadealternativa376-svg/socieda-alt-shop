import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/types/product';

interface SuccessData {
  orderId: string;
  total: number;
  items: CartItem[];
}

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const successData = location.state as SuccessData | null;

  useEffect(() => {
    if (!successData) {
      navigate('/');
      return;
    }
    
    // Clear cart after successful payment
    clearCart();
  }, [successData, navigate, clearCart]);

  if (!successData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-border/50 animate-fade-in text-center">
        <CardHeader className="pb-2">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mb-4 animate-scale-in">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-display text-foreground">
            Pagamento Confirmado!
          </h1>
          <p className="text-muted-foreground mt-2">
            Seu pedido foi realizado com sucesso
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Info */}
          <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Package className="h-5 w-5" />
              <span className="font-medium">Pedido #{successData.orderId}</span>
            </div>
            
            <div className="border-t border-border/50 pt-3 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Itens do pedido
              </p>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {successData.items.map((item) => (
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

            <div className="border-t border-border/50 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total pago</span>
                <span className="text-xl font-bold text-foreground">
                  R$ {successData.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 rounded-lg p-4 text-left space-y-2">
            <p className="text-sm font-medium text-foreground">Próximos passos:</p>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                Você receberá um e-mail com a confirmação
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                Entraremos em contato pelo WhatsApp
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                Acompanhe o status do seu pedido
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <Button asChild className="w-full h-12">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Voltar à loja
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-12">
              <Link to="/">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continuar comprando
              </Link>
            </Button>
          </div>

          {/* Support */}
          <p className="text-xs text-muted-foreground pt-2">
            Dúvidas? Entre em contato pelo WhatsApp:{' '}
            <a 
              href="https://wa.me/5511952222008" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              (11) 95222-2008
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
