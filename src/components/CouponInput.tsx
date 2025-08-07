
import { useState } from 'react';
import { Ticket, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const CouponInput = () => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const { cart, applyCoupon, removeCoupon } = useCart();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplying(true);
    const success = applyCoupon(couponCode.trim());
    
    if (success) {
      setCouponCode('');
    }
    
    setIsApplying(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
  };

  return (
    <div className="space-y-4">
      {/* Input de Cupom */}
      {!cart.appliedCoupon && (
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Digite seu cupom"
              className="w-full pl-10 pr-4 py-3 border border-card-border rounded-lg bg-card text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isApplying}
            />
          </div>
          <button
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || isApplying}
            className="btn-outline px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplying ? 'Aplicando...' : 'Aplicar'}
          </button>
        </div>
      )}

      {/* Cupom Aplicado */}
      {cart.appliedCoupon && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Ticket className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-green-800">
                  {cart.appliedCoupon.code}
                </div>
                <div className="text-sm text-green-600">
                  {cart.appliedCoupon.description}
                </div>
              </div>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-green-600 hover:text-green-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Dicas de Cupons */}
      <div className="text-xs text-accent bg-accent-light/50 p-3 rounded-lg">
        <div className="font-semibold mb-2">💡 Dicas de cupons:</div>
        <div className="space-y-1">
          <div>• <strong>Cupons Comuns:</strong> HERO10, MARVEL15, COMICS20</div>
          <div>• <strong>Cupons Raros:</strong> RARE25, LEGENDARY30, EXCLUSIVE35</div>
          <div>• Cupons raros só funcionam com HQs raras 👑</div>
        </div>
      </div>
    </div>
  );
};

export default CouponInput;
