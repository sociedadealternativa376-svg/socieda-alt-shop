import { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface CheckoutProps {
  onBack: () => void;
}

const Checkout = ({ onBack }: CheckoutProps) => {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cep: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    setStep('payment');
  };

  const handleFinishPurchase = () => {
    setStep('success');
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red flex items-center justify-center mb-6 animate-pulse-glow">
          <Check className="h-12 w-12 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-display gradient-text mb-2">Pedido Confirmado!</h3>
        <p className="text-muted-foreground text-center max-w-xs">
          Obrigado por comprar na Sociedade Alternativa. Você receberá um email com os detalhes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao carrinho
      </button>

      <h2 className="text-2xl font-display gradient-text mb-6">
        {step === 'info' ? 'Seus Dados' : 'Pagamento'}
      </h2>

      {step === 'info' && (
        <form onSubmit={handleSubmitInfo} className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(00) 00000-0000"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Rua, número"
              className="bg-secondary border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Sua cidade"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="00000-000"
                className="bg-secondary border-border"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full h-14 text-lg font-display tracking-wider bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red hover:opacity-90 transition-opacity text-primary-foreground"
            >
              CONTINUAR
            </Button>
          </div>
        </form>
      )}

      {step === 'payment' && (
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 flex-1">
            <p className="text-muted-foreground mb-4">Escolha a forma de pagamento:</p>
            
            <button
              onClick={() => setPaymentMethod('pix')}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-all ${
                paymentMethod === 'pix' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <QrCode className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">PIX</p>
                <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-all ${
                paymentMethod === 'card' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <CreditCard className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">Cartão de Crédito</p>
                <p className="text-sm text-muted-foreground">Até 12x sem juros</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('boleto')}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-all ${
                paymentMethod === 'boleto' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Banknote className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">Boleto Bancário</p>
                <p className="text-sm text-muted-foreground">Vencimento em 3 dias</p>
              </div>
            </button>
          </div>

          <div className="border-t border-border pt-6 mt-6 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-bold gradient-text">R$ {total.toFixed(2)}</span>
            </div>
            <Button 
              onClick={handleFinishPurchase}
              className="w-full h-14 text-lg font-display tracking-wider bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red hover:opacity-90 transition-opacity text-primary-foreground"
            >
              CONFIRMAR PEDIDO
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
