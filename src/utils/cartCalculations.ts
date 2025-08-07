
import { CartItem, Coupon } from '@/types/comic';

export const calculateCartTotals = (items: CartItem[], appliedCoupon?: Coupon) => {
  const subtotal = items.reduce((sum, item) => sum + (item.comic.price * item.quantity), 0);
  let discount = 0;
  
  if (appliedCoupon) {
    // Separar itens por tipo (raros e comuns)
    const rareItems = items.filter(item => item.comic.isRare);
    const commonItems = items.filter(item => !item.comic.isRare);
    
    if (appliedCoupon.type === 'rare') {
      // Desconto apenas em HQs raras
      const rareSubtotal = rareItems.reduce((sum, item) => sum + (item.comic.price * item.quantity), 0);
      discount = (rareSubtotal * appliedCoupon.discount) / 100;
    } else {
      // Desconto apenas em HQs comuns
      const commonSubtotal = commonItems.reduce((sum, item) => sum + (item.comic.price * item.quantity), 0);
      discount = (commonSubtotal * appliedCoupon.discount) / 100;
    }
  }
  
  const total = subtotal - discount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { total: Math.max(0, total), itemCount, discount };
};
