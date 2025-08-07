
import { Ticket } from 'lucide-react';
import { Cart } from '@/types/comic';
import CouponInput from '@/components/CouponInput';

interface CartSummaryProps {
  cart: Cart;
  hasRareItems: boolean;
  hasCommonItems: boolean;
}

const CartSummary = ({ cart, hasRareItems, hasCommonItems }: CartSummaryProps) => {
  const subtotal = cart.items.reduce((sum, item) => sum + (item.comic.price * item.quantity), 0);

  return (
    <div className="card-hero sticky top-24 space-y-6">
      <h2 className="text-xl font-bold text-secondary">Resumo do Pedido</h2>
      
      {/* Cupom de Desconto */}
      <div>
        <h3 className="font-semibold text-secondary mb-3">Cupom de Desconto</h3>
        <CouponInput />
      </div>
      
      {/* Separador */}
      <div className="border-t border-card-border pt-6">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-accent">
            <span>Subtotal ({cart.itemCount} itens)</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          
          {cart.discount > 0 && (
            <div className="flex justify-between text-green-600 font-semibold">
              <span>Desconto ({cart.appliedCoupon?.code})</span>
              <span>-R$ {cart.discount.toFixed(2).replace('.', ',')}</span>
            </div>
          )}
          
          <div className="flex justify-between text-accent">
            <span>Frete</span>
            <span className="text-green-600 font-semibold">Grátis</span>
          </div>
          
          <div className="border-t border-card-border pt-4">
            <div className="flex justify-between text-lg font-bold text-secondary">
              <span>Total</span>
              <span className="text-primary">
                R$ {cart.total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>

        <button className="btn-hero w-full mb-4">
          Finalizar Compra
        </button>
        
        <div className="text-center text-sm text-accent space-y-2">
          <p>✓ Entrega grátis para todo o Brasil</p>
          <p>✓ Pagamento 100% seguro</p>
          <p>✓ Garantia Marvel oficial</p>
          {hasRareItems && <p>👑 Você tem HQs raras no carrinho!</p>}
        </div>

        {/* Informações sobre tipos de cupons */}
        {(hasRareItems || hasCommonItems) && (
          <div className="mt-4 p-3 bg-accent-light/50 rounded-lg text-xs text-accent">
            <div className="font-semibold mb-1">Tipos de cupons:</div>
            {hasCommonItems && <div>• Cupons comuns: para HQs normais</div>}
            {hasRareItems && <div>• Cupons raros: para HQs raras 👑</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
