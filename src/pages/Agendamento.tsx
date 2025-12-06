import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

const services = {
  piercing: [
    { name: 'Piercing Lóbulo', price: 'R$ 80,00' },
    { name: 'Piercing Helix', price: 'R$ 120,00' },
    { name: 'Piercing Septum', price: 'R$ 150,00' },
    { name: 'Piercing Labret', price: 'R$ 130,00' },
    { name: 'Piercing Tragus', price: 'R$ 120,00' },
    { name: 'Piercing Industrial', price: 'R$ 180,00' },
  ],
  tattoo: [
    { name: 'Tattoo Pequena (até 5cm)', price: 'R$ 200,00' },
    { name: 'Tattoo Média (5-15cm)', price: 'R$ 450,00' },
    { name: 'Tattoo Grande (15-30cm)', price: 'R$ 800,00' },
    { name: 'Cover-Up', price: 'R$ 600,00' },
    { name: 'Flash Tattoo', price: 'R$ 150,00' },
  ],
};

const timeSlots = [
  '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

const AgendamentoContent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '' as 'piercing' | 'tattoo' | '',
    serviceName: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'serviceType') {
      setFormData(prev => ({ ...prev, serviceName: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceType || !formData.serviceName || !formData.preferredDate || !formData.preferredTime) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('appointments').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_type: formData.serviceType,
        service_name: formData.serviceName,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        message: formData.message || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Agendamento enviado!",
        description: "Entraremos em contato para confirmar seu horário.",
      });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red flex items-center justify-center animate-pulse-glow">
                <Check className="h-12 w-12 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-display gradient-text mb-4">AGENDAMENTO ENVIADO!</h1>
              <p className="text-muted-foreground mb-8">
                Recebemos sua solicitação. Entraremos em contato pelo telefone ou email informado para confirmar seu horário.
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red text-primary-foreground"
              >
                Voltar para a Loja
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display gradient-text mb-4">
                AGENDE SEU HORÁRIO
              </h1>
              <p className="text-muted-foreground">
                Escolha o serviço e horário de sua preferência. Entraremos em contato para confirmar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg gradient-border">
              {/* Service Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, serviceType: 'piercing', serviceName: '' }))}
                  className={`p-6 rounded-lg border-2 flex flex-col items-center gap-3 transition-all ${
                    formData.serviceType === 'piercing'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Zap className={`h-8 w-8 ${formData.serviceType === 'piercing' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-display text-lg">PIERCING</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, serviceType: 'tattoo', serviceName: '' }))}
                  className={`p-6 rounded-lg border-2 flex flex-col items-center gap-3 transition-all ${
                    formData.serviceType === 'tattoo'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Sparkles className={`h-8 w-8 ${formData.serviceType === 'tattoo' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-display text-lg">TATTOO</span>
                </button>
              </div>

              {/* Service Selection */}
              {formData.serviceType && (
                <div className="space-y-2">
                  <Label>Selecione o Serviço *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services[formData.serviceType].map((service) => (
                      <button
                        key={service.name}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, serviceName: service.name }))}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          formData.serviceName === service.name
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <p className="font-medium text-foreground">{service.name}</p>
                        <p className="text-sm text-primary">{service.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Data Preferida *
                  </Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    min={today}
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Horário Preferido *
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, preferredTime: time }))}
                        className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          formData.preferredTime === time
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Observações (opcional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Descreva sua ideia, referências, dúvidas..."
                  className="bg-secondary border-border min-h-[100px]"
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-display tracking-wider bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red hover:opacity-90 transition-opacity text-primary-foreground"
              >
                {isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR AGENDAMENTO'}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Agendamento = () => {
  return (
    <CartProvider>
      <AgendamentoContent />
    </CartProvider>
  );
};

export default Agendamento;
