
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { savePrivateKey } from '@/services/marvelApi';
import { toast } from '@/hooks/use-toast';
import { Key, Shield } from 'lucide-react';

interface MarvelApiKeyFormProps {
  onKeySaved: () => void;
}

const MarvelApiKeyForm = ({ onKeySaved }: MarvelApiKeyFormProps) => {
  const [privateKey, setPrivateKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privateKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira sua chave privada da Marvel.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      savePrivateKey(privateKey.trim());
      
      toast({
        title: "Chave salva com sucesso!",
        description: "Agora você pode acessar a API completa da Marvel.",
      });
      
      onKeySaved();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar a chave privada.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Key className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Configuração da API Marvel</span>
          </CardTitle>
          <CardDescription>
            Insira sua chave privada da Marvel para acessar a API completa. 
            Ela será armazenada de forma segura no seu navegador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="privateKey">Chave Privada Marvel</Label>
              <Input
                id="privateKey"
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Insira sua chave privada"
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Você pode encontrar sua chave privada no painel de desenvolvedor da Marvel.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Chave'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarvelApiKeyForm;
