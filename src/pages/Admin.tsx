import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Ticket, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.png';
import CouponsManager from '@/components/admin/CouponsManager';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Sociedade Alternativa" className="h-10 w-10" />
            <div>
              <h1 className="font-display text-xl gradient-text">PAINEL ADMIN</h1>
              <p className="text-xs text-muted-foreground">Sociedade Alternativa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Ticket className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-display gradient-text">Gerenciar Cupons</h2>
        </div>
        <CouponsManager />
      </main>
    </div>
  );
};

export default Admin;
