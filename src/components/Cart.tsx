import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();

  const handleWhatsAppOrder = () => {
    const itemsList = items.map(item => 
      `• ${item.name} (${item.id.toUpperCase()}) - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = encodeURIComponent(
      `Olá! Gostaria de fazer um pedido:\n\n${itemsList}\n\n*Total: R$ ${total.toFixed(2)}*\n\nPor favor, confirme a disponibilidade!`
    );
    window.open(`https://wa.me/5511952222008?text=${message}`, '_blank');
  };

  const handlePixCheckout = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para continuar com o pagamento via Pix.",
      });
      navigate('/auth', { 
        state: { 
          from: '/checkout/pix',
          orderData: {
            items,
            total,
            orderId: Date.now().toString().slice(-6),
          }
        } 
      });
      return;
    }

    const orderId = Date.now().toString().slice(-6);
    navigate('/checkout/pix', {
      state: {
        items,
        total,
        orderId,
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-display text-foreground mb-2">Carrinho Vazio</h3>
        <p className="text-muted-foreground text-center">
          Adicione produtos para fazer seu pedido
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display gradient-text">Seu Carrinho</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearCart}
          className="text-muted-foreground hover:text-destructive"
        >
          Limpar
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex gap-4 p-4 rounded-lg bg-secondary/50 gradient-border"
          >
            <img 
              src={item.image} 
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{item.name}</h4>
              <p className="text-xs text-muted-foreground uppercase">{item.id}</p>
              <p className="text-primary font-bold mt-1">
                R$ {item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 bg-background rounded-full px-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6 mt-6 space-y-4">
        <div className="flex justify-between text-lg">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-bold gradient-text">R$ {total.toFixed(2)}</span>
        </div>
        
        <Button 
          className="w-full h-14 text-lg font-display tracking-wider transition-colors gap-2"
          onClick={handlePixCheckout}
        >
          <CreditCard className="h-5 w-5" />
          PAGAR COM PIX
        </Button>
        
        <Button 
          variant="outline"
          className="w-full h-12 text-base font-medium bg-[#25D366] hover:bg-[#20BD5A] border-0 text-white gap-2"
          onClick={handleWhatsAppOrder}
        >
          <MessageCircle className="h-5 w-5" />
          Pedir via WhatsApp
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Pague com Pix ou envie seu pedido pelo WhatsApp
        </p>
      </div>
    </div>
  );
};

export default Cart;
