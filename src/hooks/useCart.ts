import { useState, useEffect } from 'react';
import { Comic, CartItem, Cart, Coupon } from '@/types/comic';
import { toast } from '@/hooks/use-toast';
import { validateCoupon } from '@/data/coupons';
import { calculateCartTotals } from '@/utils/cartCalculations';

const CART_STORAGE_KEY = 'marvel-store-cart';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
    discount: 0
  });

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Carrinho carregado:', parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    console.log('Salvando carrinho:', cart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Adicionar item ao carrinho
  const addToCart = (comic: Comic, quantity: number = 1) => {
    console.log('addToCart chamado com:', comic.title, 'quantidade:', quantity);
    
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.comic.id === comic.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.comic.id === comic.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast({
          title: "Quantidade atualizada!",
          description: `${comic.title} - Nova quantidade: ${existingItem.quantity + quantity}`,
        });
      } else {
        newItems = [...prevCart.items, { comic, quantity }];
        toast({
          title: "Adicionado ao carrinho!",
          description: `${comic.title} foi adicionado com sucesso.`,
        });
      }
      
      const { total, itemCount, discount } = calculateCartTotals(newItems, prevCart.appliedCoupon);
      const newCart = { 
        items: newItems, 
        total, 
        itemCount, 
        discount, 
        appliedCoupon: prevCart.appliedCoupon 
      };
      
      console.log('Novo estado do carrinho:', newCart);
      return newCart;
    });
  };

  // Remover item do carrinho
  const removeFromCart = (comicId: number) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.items.find(item => item.comic.id === comicId);
      const newItems = prevCart.items.filter(item => item.comic.id !== comicId);
      const { total, itemCount, discount } = calculateCartTotals(newItems, prevCart.appliedCoupon);
      
      if (itemToRemove) {
        toast({
          title: "Item removido",
          description: `${itemToRemove.comic.title} foi removido do carrinho.`,
        });
      }
      
      return { 
        items: newItems, 
        total, 
        itemCount, 
        discount, 
        appliedCoupon: prevCart.appliedCoupon 
      };
    });
  };

  // Atualizar quantidade de um item
  const updateQuantity = (comicId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(comicId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.comic.id === comicId
          ? { ...item, quantity }
          : item
      );
      const { total, itemCount, discount } = calculateCartTotals(newItems, prevCart.appliedCoupon);
      return { 
        items: newItems, 
        total, 
        itemCount, 
        discount, 
        appliedCoupon: prevCart.appliedCoupon 
      };
    });
  };

  // Aplicar cupom
  const applyCoupon = (code: string): boolean => {
    const coupon = validateCoupon(code);
    
    if (!coupon) {
      toast({
        title: "Cupom inválido",
        description: "O código do cupom não foi encontrado.",
        variant: "destructive"
      });
      return false;
    }

    // Verificar se há itens compatíveis com o cupom
    const hasCompatibleItems = cart.items.some(item => 
      coupon.type === 'rare' ? item.comic.isRare : !item.comic.isRare
    );

    if (!hasCompatibleItems) {
      const itemType = coupon.type === 'rare' ? 'raras' : 'comuns';
      toast({
        title: "Cupom não aplicável",
        description: `Este cupom só funciona com HQs ${itemType}, mas você não possui nenhuma no carrinho.`,
        variant: "destructive"
      });
      return false;
    }

    setCart(prevCart => {
      const { total, itemCount, discount } = calculateCartTotals(prevCart.items, coupon);
      
      toast({
        title: "Cupom aplicado!",
        description: `${coupon.description} - Economia de R$ ${discount.toFixed(2).replace('.', ',')}`,
      });
      
      return { 
        ...prevCart, 
        total, 
        itemCount, 
        discount, 
        appliedCoupon: coupon 
      };
    });

    return true;
  };

  // Remover cupom
  const removeCoupon = () => {
    setCart(prevCart => {
      const { total, itemCount, discount } = calculateCartTotals(prevCart.items);
      
      toast({
        title: "Cupom removido",
        description: "O desconto foi removido do seu carrinho.",
      });
      
      return { 
        ...prevCart, 
        total, 
        itemCount, 
        discount, 
        appliedCoupon: undefined 
      };
    });
  };

  // Limpar carrinho
  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
      discount: 0
    });
    toast({
      title: "Carrinho limpo",
      description: "Todos os itens foram removidos do carrinho.",
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart
  };
};
