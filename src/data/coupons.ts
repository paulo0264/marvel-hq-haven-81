
import { Coupon } from '@/types/comic';

export const mockCoupons: Coupon[] = [
  // Cupons Comuns
  {
    code: 'HERO10',
    type: 'common',
    discount: 10,
    description: '10% de desconto em HQs comuns'
  },
  {
    code: 'MARVEL15',
    type: 'common',
    discount: 15,
    description: '15% de desconto em HQs comuns'
  },
  {
    code: 'COMICS20',
    type: 'common',
    discount: 20,
    description: '20% de desconto em HQs comuns'
  },
  
  // Cupons Raros
  {
    code: 'RARE25',
    type: 'rare',
    discount: 25,
    description: '25% de desconto em HQs raras'
  },
  {
    code: 'LEGENDARY30',
    type: 'rare',
    discount: 30,
    description: '30% de desconto em HQs raras'
  },
  {
    code: 'EXCLUSIVE35',
    type: 'rare',
    discount: 35,
    description: '35% de desconto em HQs raras'
  }
];

export const validateCoupon = (code: string): Coupon | null => {
  const coupon = mockCoupons.find(c => c.code.toLowerCase() === code.toLowerCase());
  return coupon || null;
};
